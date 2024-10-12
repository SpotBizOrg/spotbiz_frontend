import { Modal, Button } from "flowbite-react";
import React, { useState } from "react";

const categoriesData = [
  {
    type: "Stationary",
    tags: ["Books", "Pens", "Notebooks", "Markers", "Pencils"],
  },
  {
    type: "Hotels",
    tags: ["Luxury", "Budget", "Family", "Business", "Boutique"],
  },
  {
    type: "Food",
    tags: ["Fruits", "Vegetables", "Meats", "Snacks", "Desserts"],
  },
  {
    type: "Computer Shops",
    tags: ["Laptops", "Desktops", "Monitors", "Printers", "Accessories"],
  },
  {
    type: "Electronic Shops",
    tags: ["TVs", "Smartphones", "Tablets", "Cameras", "Speakers"],
  },
];

interface CategoriesTableProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({
  showModal,
  setShowModal,
}) => {
  const [newTag, setNewTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddTag = () => {
    if (selectedCategory && newTag) {
      const category = categoriesData.find(
        (cat) => cat.type === selectedCategory
      );
      if (category) {
        category.tags.push(newTag);
      }
      setShowModal(false);
      setNewTag("");
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3"
                style={{ minWidth: "100px" }}
              >
                Business Type
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                style={{ minWidth: "100px" }}
              >
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {categoriesData.map((category, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-2 px-4 ">{category.type}</td>
                <td className="py-2 px-4 ">
                  {category.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          size="lg"
          onClose={() => setShowModal(false)}
          theme={{
            content: {
              base: "bg-white w-3/4 rounded-lg",
            },
          }}
        >
          <Modal.Header>Add Tag</Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Business Type</option>
                {categoriesData.map((category, index) => (
                  <option key={index} value={category.type}>
                    {category.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={handleAddTag}
            >
              Add Coupon
            </button>
            <button
              type="button"
              className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CategoriesTable;
