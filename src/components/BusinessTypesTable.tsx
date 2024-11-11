import { Modal } from "flowbite-react";
import React, { useState, useEffect } from "react";

interface Tag {
  id: number;
  name: string;
}

interface BusinessType {
  id: number;
  type: string;
  tags: Tag[];
}

interface BusinessTypesTableProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const BusinessTypesTable: React.FC<BusinessTypesTableProps> = ({
  showModal,
  setShowModal,
}) => {
  const [businessTypesData, setBusinessTypesData] = useState<BusinessType[]>([]);
  const [newTag, setNewTag] = useState("");
  const [selectedBusinessTypeId, setSelectedBusinessTypeId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddBusinessModal, setShowAddBusinessModal] = useState(false); // Modal state for adding a new business type
  const [newBusinessType, setNewBusinessType] = useState(""); // New business type state
  const [newTags, setNewTags] = useState<string[]>([]); // New tags for the business type

  // Fetch business types data from the backend
  useEffect(() => {
    const fetchBusinessTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/api/v1/admin/business_type/all");
        if (!response.ok) {
          throw new Error(`Failed to fetch business types: ${response.statusText}`);
        }
        const data = await response.json();
        const adjustedData: BusinessType[] = data.map((item: any) => {
          return {
            id: item.categoryId,
            type: item.categoryName,
            tags: JSON.parse(item.tags).keywords.map((keyword: string, index: number) => ({
              id: index,
              name: keyword,
            }))
          };
        });
        setBusinessTypesData(adjustedData);
      } catch (error) {
        console.error("Error fetching business types:", error);
        setError("Could not load business types. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessTypes();
  }, []);

  const handleAddTag = () => {
    if (selectedBusinessTypeId !== null && newTag.trim() !== "") {
      fetch(`http://localhost:8080/api/v1/admin/business_type/${selectedBusinessTypeId}/tag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTag }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.error || "Failed to add tag");
            });
          } else {
            window.location.reload();
            return response.json();
          }
        })
        .then((newTagData) => {
          const updatedBusinessTypes = businessTypesData.map((bt) => {
            if (bt.id === selectedBusinessTypeId) {
              const existingTags = bt.tags || [];
              return {
                ...bt,
                tags: [...existingTags, { id: newTagData.id, name: newTagData.name }],
              };
            }
            return bt;
          });
          setBusinessTypesData(updatedBusinessTypes);
          setShowModal(false);
          setNewTag("");
        })
        .catch((error) => {
          console.error("Error adding tag:", error);
          setError("Failed to add tag. Please try again.");
        });
    } else {
      setError("Please select a business type and provide a tag name.");
    }
  };

  const handleAddBusinessType = () => {
    if (newBusinessType.trim() !== "" && newTags.length > 0) {
      fetch("http://localhost:8080/api/v1/admin/business_type", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: newBusinessType,
          tags: newTags,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.error || "Failed to add business type");
            });
          }
          return response.json();
        })
        .then((newBusinessTypeData) => {
          setBusinessTypesData([...businessTypesData, newBusinessTypeData]);
          setShowAddBusinessModal(false);
          setNewBusinessType("");
          setNewTags([]);
        })
        .catch((error) => {
          console.error("Error adding business type:", error);
          setError("Failed to add business type. Please try again.");
        });
    } else {
      setError("Please provide a business type and at least one tag.");
    }
  };

  return (
    <div className="relative">
      <div className="relative overflow-x-auto sm:rounded-lg border border-gray-200">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-10 py-6"><center>Business_Type</center></th>
                <th scope="col" className="px-8 py-6"><center>Tags</center></th>
              </tr>
            </thead>
            <tbody>
              {businessTypesData.length > 0 ? (
                businessTypesData.map((businessType) => (
                  <tr key={businessType.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 relative">
                    <td className="py-2 px-12">{businessType.type}</td>
                    <td className="py-3 px-4">
                      {businessType.tags.map((tag) => (
                        <span key={tag.id} className="inline-block bg-gray-200 text-gray-700 rounded-full px-4 py-1.5 text-sm font-medium mr-2.5 mb-2.5">
                          {tag.name}
                        </span>
                      ))}
                    </td>
                    <td className="py-3 px-4 relative">
                      <button
                        onClick={() => {
                          setSelectedBusinessTypeId(businessType.id);
                          setShowModal(true);
                        }}
                        className="absolute bottom-3 right-4 flex items-center space-x-2 px-3 py-2 text-xs font-medium text-black bg-gray-100 rounded-lg shadow-sm hover:bg-gray-400 whitespace-nowrap"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-gray-700">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Tag</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center">No business types available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Tag Modal */}
      {showModal && (
        <Modal show={showModal} size="lg" onClose={() => setShowModal(false)}>
          <Modal.Header>Add Tag</Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              {selectedBusinessTypeId !== null ? (
                <div className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                  {businessTypesData.find(businessType => businessType.id === selectedBusinessTypeId)?.type}
                </div>
              ) : (
                <select
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={selectedBusinessTypeId ?? ''}
                  onChange={(e) => setSelectedBusinessTypeId(Number(e.target.value))}
                >
                  <option value="">Select Business Type</option>
                  {businessTypesData.map((businessType) => (
                    <option key={businessType.id} value={businessType.id}>
                      {businessType.type}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">New Tag</label>
              <input
                type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter tag name"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
          <div className="flex justify-center space-x-4 w-full">
            <button
              type="button"
              className="px-6 py-3 text-sm font-medium text-white bg-gray-800 rounded-xl"
              onClick={handleAddTag}
            >
              Add Tag
            </button>
            <button
              type="button"
              className="px-6 py-3 text-sm font-medium text-white bg-gray-500 rounded-xl"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BusinessTypesTable;
