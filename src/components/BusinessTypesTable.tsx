// import { Modal } from "flowbite-react";
// import React, { useState, useEffect } from "react";

// // Define the TypeScript interfaces for your data
// interface Tag {
//   id: number;
//   name: string;
// }

// interface BusinessType {
//   id: number;
//   type: string;
//   tags: Tag[];
// }

// interface BusinessTypesTableProps {
//   showModal: boolean;
//   setShowModal: (show: boolean) => void;
// }

// const BusinessTypesTable: React.FC<BusinessTypesTableProps> = ({
//   showModal,
//   setShowModal,
// }) => {
//   const [businessTypesData, setBusinessTypesData] = useState<BusinessType[]>([]);
//   const [newTag, setNewTag] = useState("");
//   const [selectedBusinessTypeId, setSelectedBusinessTypeId] = useState("");

//   // Fetch business types data from the backend
//   useEffect(() => {
//     fetch("/api/v1/admin/business_types")
//       .then((response) => response.json())
//       .then((data: BusinessType[]) => setBusinessTypesData(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const handleAddTag = () => {
//     if (selectedBusinessTypeId && newTag) {
//       fetch(`/api/v1/admin/business_types/${selectedBusinessTypeId}/tags`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: newTag }),
//       })
//         .then((response) => response.json())
//         .then((newTagData: Tag) => {
//           // Update the local state with the new tag
//           const updatedBusinessTypes = businessTypesData.map((bt) => {
//             if (bt.id === Number(selectedBusinessTypeId)) {
//               return {
//                 ...bt,
//                 tags: [...bt.tags, newTagData],
//               };
//             }
//             return bt;
//           });
//           setBusinessTypesData(updatedBusinessTypes);
//           setShowModal(false);
//           setNewTag("");
//         })
//         .catch((error) => console.error("Error adding tag:", error));
//     }
//   };

//   return (
//     <div>
//       <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//           <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3" style={{ minWidth: "100px" }}>
//                 Business Type
//               </th>
//               <th scope="col" className="px-6 py-3" style={{ minWidth: "100px" }}>
//                 Tags
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {businessTypesData.map((businessType, index) => (
//               <tr
//                 key={index}
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//               >
//                 <td className="py-2 px-4 ">{businessType.type}</td>
//                 <td className="py-2 px-4 ">
//                   {businessType.tags.map((tag) => (
//                     <span
//                       key={tag.id}
//                       className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2"
//                     >
//                       {tag.name}
//                     </span>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {showModal && (
//         <Modal
//           show={showModal}
//           size="lg"
//           onClose={() => setShowModal(false)}
//           theme={{
//             content: {
//               base: "bg-white w-3/4 rounded-lg",
//             },
//           }}
//         >
//           <Modal.Header>Add Tag</Modal.Header>
//           <Modal.Body>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Business Type
//               </label>
//               <select
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={selectedBusinessTypeId}
//                 onChange={(e) => setSelectedBusinessTypeId(e.target.value)}
//               >
//                 <option value="">Select Business Type</option>
//                 {businessTypesData.map((businessType) => (
//                   <option key={businessType.id} value={businessType.id.toString()}>
//                     {businessType.type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Tag
//               </label>
//               <input
//                 type="text"
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//               />
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <button
//               type="button"
//               className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
//               onClick={handleAddTag}
//             >
//               Add Tag
//             </button>
//             <button
//               type="button"
//               className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
//               onClick={() => setShowModal(false)}
//             >
//               Cancel
//             </button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default BusinessTypesTable;


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

  // Fetch business types data from the backend
  useEffect(() => {
    // Fetch the data from the backend
    fetch("http://localhost:8080/api/v1/admin/business_type")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch business types");
        }
        return response.json();
      })
      .then((data: BusinessType[]) => {
        setBusinessTypesData(data); // Save the fetched data to the state
      
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        
        
      });
  }, []);
  const handleAddTag = () => {
    if (selectedBusinessTypeId !== null && newTag) {
      fetch(`http://localhost:8080/api/v1/admin/business_type/${selectedBusinessTypeId}/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTag }),
      })
        .then((response) => response.json())
        .then((newTagData: Tag) => {
          // Update the local state with the new tag
          const updatedBusinessTypes = businessTypesData.map((bt) => {
            if (bt.id === selectedBusinessTypeId) {
              return {
                ...bt,
                tags: [...bt.tags, newTagData],
              };
            }
            return bt;
          });
          setBusinessTypesData(updatedBusinessTypes);
          setShowModal(false);
          setNewTag("");  // Clear input field
        })
        .catch((error) => console.error("Error adding tag:", error));
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto sm:rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Business Type</th>
              <th scope="col" className="px-6 py-3">Tags</th>
            </tr>
          </thead>
          <tbody>
            {businessTypesData.map((businessType) => (
              <tr key={businessType.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-2 px-4 ">{businessType.type}</td>
                <td className="py-2 px-4 ">
                  {businessType.tags.map((tag) => (
                    <span key={tag.id} className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2">
                      {tag.name}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <Modal.Footer>
            <button
              type="button"
              className="p-2 text-sm font-medium text-white bg-blue-500 rounded-lg"
              onClick={handleAddTag}
            >
              Add Tag
            </button>
            <button
              type="button"
              className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg"
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
