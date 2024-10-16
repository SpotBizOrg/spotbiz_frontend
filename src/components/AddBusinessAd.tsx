import React, { useState, useEffect } from "react";
import { Modal, TextInput, Label, Button } from "flowbite-react";
import Select from "react-select";
import { useAuth } from "../utils/AuthProvider";
import { toast } from "react-toastify";

interface Advertisement {
  img: string;
  description: string;
  businessId: Number;
  category: Number;
  tags: { label: string; value: string }[];
}

interface AddAdvertisementModalProps {
  show: boolean;
  onClose: () => void;
  onAdd: (newAd: Partial<Advertisement>) => void;
}

const AddAdvertisementModal: React.FC<AddAdvertisementModalProps> = ({
  show,
  onClose,
  onAdd,
}) => {
  const [newAd, setNewAd] = useState<Partial<Advertisement>>({
    description: "",
    img: "",
    businessId: 0,
    tags: [],
    category: 0,
  });
  const [tagOptions, setTagOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    description?: string;
    img?: string;
    tags?: string;
  }>({});
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [category, setCategory] = useState<number | null>(null);

  const { token, user } = useAuth();

  useEffect(() => {
    fetchBusinessId();
    if (show) {
      fetchTags();
    } else {
      handleResetForm();
    }
  }, [show, user?.email]);

  const fetchBusinessId = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/business_owner/business/${user?.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch id");
      }

      const data = await response.json();
      console.log(data);
      setCategory(data.categoryId);
      setBusinessId(data.businessId);
      setNewAd((prevState) => ({
        ...prevState,
        businessId: data.businessId,
      }));
    } catch (err: any) {
      setError(err.message || "Failed to fetch id");
    }
  };

  const fetchTags = async () => {
    if (!category) {
      onClose();
      handleResetForm();
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/business/tags/${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }

      const data = await response.json();
      setBusinessId(data.businessId);
      const options = data.keywords.map((tag: string) => ({
        value: tag,
        label: tag,
      }));
      setTagOptions(options);
    } catch (err: any) {
      setError(err.message || "Failed to fetch tags");
    }
  };

  const validateForm = () => {
    let hasError = false;
    let tempErrors: {
      description?: string;
      img?: string;
      tags?: string;
    } = {};

    if (!newAd.description?.trim()) {
      tempErrors.description = "Advertisement name is required";
      hasError = true;
    }

    if (!newAd.tags || newAd.tags.length === 0) {
      tempErrors.tags = "At least one tag is required";
      hasError = true;
    }

    if (!newAd.img) {
      tempErrors.img = "Advertisement image is required";
      hasError = true;
    }

    setErrors(tempErrors);
    return !hasError;
  };

  const handleResetForm = () => {
    setNewAd({
      description: "",
      img: "",
      businessId: businessId ?? 0,
      tags: [],
    });
    setErrors({});
    setError(null);
  };
  const handleAddAd = async () => {
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const transformedTags = newAd.tags
      ? newAd.tags.map((tag) => tag.value)
      : [];

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/advertisement/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...newAd, tags: transformedTags }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Your session might have expired.");
        } else if (response.status === 404) {
          throw new Error("Not found: The requested resource was not found.");
        }
        throw new Error("An unexpected error occurred.");
      } else {
        toast.success("Advertisement added successfully!");
      }

      const data = await response.json();
      onAdd(data);
      onClose();
      handleResetForm();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      dismissible
      show={show}
      onClose={onClose}
      size="lg"
      theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg",
          inner: "rounded-lg shadow-lg",
        },
      }}
    >
      <Modal.Header>Add New Advertisement</Modal.Header>
      <Modal.Body>
        <form className="space-y-6">
          <div>
            <Label htmlFor="description">Advertisement Name</Label>
            <TextInput
              id="description"
              type="text"
              value={newAd.description || ""}
              onChange={(e) =>
                setNewAd({ ...newAd, description: e.target.value })
              }
              className="mt-1"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Select
              id="tags"
              isMulti
              options={tagOptions}
              value={newAd.tags}
              onChange={(selectedOptions) =>
                setNewAd({
                  ...newAd,
                  tags: selectedOptions as {
                    label: string;
                    value: string;
                  }[],
                })
              }
              className="mt-1"
            />
            {errors.tags && (
              <p className="text-red-500 text-xs mt-1">{errors.tags}</p>
            )}
          </div>
          <div>
            <Label htmlFor="image">Advertisement Image</Label>
            <TextInput
              id="image"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewAd({ ...newAd, img: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="mt-1"
            />
            {errors.img && (
              <p className="text-red-500 text-xs mt-1">{errors.img}</p>
            )}
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="bg-bluedark"
          onClick={handleAddAd}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Advertisement"}
        </Button>
        <Button
          color="gray"
          onClick={() => {
            handleResetForm();
            onClose();
          }}
          disabled={loading}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAdvertisementModal;
