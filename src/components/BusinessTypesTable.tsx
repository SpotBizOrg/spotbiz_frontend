


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
  const [loading, setLoading] = useState<boolean>(true); // Added loading state
  const [error, setError] = useState<string | null>(null); // Added error state

  // Fetch business types data from the backend
  useEffect(() => {
    const fetchBusinessTypes = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const response = await fetch("http://localhost:8080/api/v1/admin/business_type/all");
        if (!response.ok) {
          throw new Error(`Failed to fetch business types: ${response.statusText}`);
        }
        const data = await response.json();
        // Adjust the data to parse tags from the JSON string
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
      
        console.log("Fetched business types:", adjustedData);
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
          body: JSON.stringify({ name: newTag }), // Send an object with `name` as the key
      })
      .then((response) => {
          if (!response.ok) {
              return response.json().then(err => {
                  throw new Error(err.error || "Failed to add tag");
              });
          }else{
            window.location.reload()
            return response.json
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
          }) as BusinessType[];
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


  

  return (
    <div>
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
                <th scope="col" className="px-8 py-6"  ><center>Tags</center></th>
              </tr>
            </thead>
            <tbody>
              {businessTypesData.length > 0 ? (
                businessTypesData.map((businessType) => (
                  <tr key={businessType.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="py-2 px-12">{businessType.type}</td>
                    <td className="py-3 px-4">
                      {businessType.tags.map((tag) => (
                        <span key={tag.id} className="inline-block bg-gray-200 text-gray-700 rounded-full px-4 py-1.5 text-sm font-medium mr-2.5 mb-2.5">
                          {tag.name}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="py-4 text-center">No business types available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <Modal show={showModal} size="lg" onClose={() => setShowModal(false)}>
          <Modal.Header>Add Tag</Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
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
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
              <input
                type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-center space-x-10">
            <button
              type="button"
              className="px-5 py-2 text-sm font-medium text-white bg-gray-800 rounded-xl"
              onClick={handleAddTag}
            >
              Add Tag
            </button>
            <button
              type="button"
              className="px-5 py-2 text-sm font-medium text-white bg-gray-500 rounded-xl"
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

export default BusinessTypesTable;
