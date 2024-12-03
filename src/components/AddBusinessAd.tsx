import React, { useState, useEffect } from "react";
import { Modal, TextInput, Label, Button } from "flowbite-react";
import Select from "react-select";
import { useAuth } from "../utils/AuthProvider";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";

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
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { token, user } = useAuth();

  useEffect(() => {
    fetchBusinessId();
    if (!show) {
      handleResetForm();
    }
  }, [show, user?.email]);

  const fetchBusinessId = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/business_owner/business/${user?.email}`,
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
      setTagOptions(
        data.tags.map((tag: string) => ({ value: tag, label: tag }))
      );
      setNewAd((prevState) => ({
        ...prevState,
        businessId: data.businessId,
      }));
    } catch (err: any) {
      setError(err.message || "Failed to fetch id");
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

    if (!imageFile) {
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
      businessId: 0,
      tags: [],
    });
    setImageFile(null);
    setErrors({});
    setError(null);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BACKEND_URL}/upload_image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.message || "Unknown error"
        }`
      );
    }

    return response.text();
  };

  const handleAddAd = async () => {
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadImage(imageFile!);
      const transformedTags = newAd.tags?.map((tag) => tag.value) || [];
      const adData = { ...newAd, img: imageUrl, tags: transformedTags };

      const response = await fetch(
        `${BACKEND_URL}/advertisement/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(adData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add advertisement");
      }

      const data = await response.json();
      toast.success("Advertisement added successfully!");
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
    <Modal dismissible show={show} onClose={onClose} size="lg">
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
                setImageFile(file || null);
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
          onClick={handleAddAd}
          disabled={loading}
          className="bg-bluedark"
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
