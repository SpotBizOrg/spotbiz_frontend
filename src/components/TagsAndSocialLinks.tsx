import React, { useEffect, useState } from "react";
import { Modal, Button, Card } from "flowbite-react";
import { MdOutlineModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import SocialLinksCard from "./SocialLinksCard";
import { useAuth } from "../utils/AuthProvider";

interface BusinessSocialLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  youtube: string;
}

interface TagsAndSocialLinksProps {
  businessDetails: {
    name: string;
    businessRegNo: string;
    description: string;
    locationUrl: string;
    contactNo: string;
    address: string;
    status: string;
    categoryId: string;
    subscriptionPackage: string;
    businessSocialLinks: BusinessSocialLinks;
    choosenTags: string[];
  };
}

const TagsAndSocialLinks: React.FC<TagsAndSocialLinksProps> = ({
  businessDetails,
}) => {
  const [openTagModal, setOpenTagModal] = useState(false);
  const [openSocialModal, setOpenSocialModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user } = useAuth();

  const [selectedTags, setSelectedTags] = useState<string[]>(
    businessDetails.choosenTags || []
  );
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/category/name/${businessDetails.categoryId}`
        );
        if (!response.ok) {
          throw new Error("Category not found");
        }
        const data = await response.json();
        setCategoryName(data.categoryName);

        const parsedTags = JSON.parse(data.tags).keywords;
        setTags(parsedTags);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    if (businessDetails.categoryId) {
      fetchCategoryName();
    }
  }, [businessDetails.categoryId]);

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      if (isTagSelected(tag)) {
        setErrorMessage(null);
        return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
      } else if (prevSelectedTags.length < 3) {
        setErrorMessage(null);
        return [...prevSelectedTags, tag];
      } else {
        setErrorMessage("You can only select up to 3 tags.");
        return prevSelectedTags;
      }
    });
  };

  const handleUpdateTags = () => {
    fetch(`http://localhost:8080/api/v1/category/tag/update/${user!.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags: selectedTags }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tags updated successfully:", data);
        toast.success("Tags updated successfully!");
        businessDetails.choosenTags = selectedTags;
        setOpenTagModal(false);
      })
      .catch((error) => {
        toast.error("Error updating tags, please try again.");
        console.error("Error updating tags:", error);
      });
  };

  const isTagSelected = (tag: string) => selectedTags.includes(tag);

  return (
    <div className="flex justify-between gap-4">
      <Card className="bg-white shadow-md border border-gray-200 flex-1">
        <div className="fixed bottom-0 right-0 m-8 w-24 h-24">
          <div className="relative w-full h-full">
            <div
              className="bg-bluedark absolute w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-300"
              onClick={() => setOpenTagModal(true)}
              style={{
                transform: " translateX(-34rem) translateY(-3rem)",
              }}
            >
              <MdOutlineModeEdit className="text-lg" />
            </div>
          </div>
        </div>
        <div className="flex justify-between  px-4 py-4">
          <div className="flex-1">
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <p className="text-black text-sm font-medium p-2">Category</p>
              </div>
              <p className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full inline-block">
                {categoryName}
              </p>
            </div>
            <div>
              <p className="text-black text-sm font-medium p-2">Tags</p>
              <div className="flex flex-wrap">
                {businessDetails.choosenTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Modal
          show={openTagModal}
          onClose={() => setOpenTagModal(false)}
          theme={{
            content: {
              base: "bg-white w-3/4 rounded-lg", // Adjust width and rounded corners
              inner: "p-6 rounded-lg shadow-lg",
            },
          }}
        >
          <Modal.Header>Update Tags</Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-5">
                <label
                  htmlFor="category"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Category:
                </label>
                <input
                  id="category"
                  value={categoryName || ""}
                  disabled
                  className="w-full p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                Choose Tags:
              </h3>

              <ul className="grid w-full gap-2 md:grid-cols-3">
                {tags.map((tag, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={`${tag}-option`}
                      value={tag}
                      checked={isTagSelected(tag)}
                      onChange={() => handleTagChange(tag)}
                      className="hidden"
                    />
                    <label
                      htmlFor={`${tag}-option`}
                      className={`inline-flex items-center justify-between w-full p-2 border rounded-lg cursor-pointer 
          ${
            isTagSelected(tag)
              ? "border-bluedark bg-bluegray text-blue-600 dark:bg-blue-600 dark:text-white"
              : "border-gray-200 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
          }
          hover:bg-gray-50 dark:hover:bg-gray-700`}
                    >
                      <div className="block">
                        <div className="w-full text-xs font-semibold">
                          {tag}
                        </div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
              {errorMessage && (
                <p className="mt-2 text-red-500 text-sm">{errorMessage}</p> // Display error message
              )}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleUpdateTags}
              className="bg-bluedark text-white rounded-md flex items-center"
            >
              Update
            </Button>
            <Button color="gray" onClick={() => setOpenTagModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
      <SocialLinksCard
        openSocialModal={openSocialModal}
        setOpenSocialModal={setOpenSocialModal}
      />
    </div>
  );
};

export default TagsAndSocialLinks;
