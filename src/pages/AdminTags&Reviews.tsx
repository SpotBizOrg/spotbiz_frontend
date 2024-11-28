import React, { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import BusinessTypesTable from "../components/BusinessTypesTable";
import Container from "../components/Container";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Modal } from "flowbite-react";
import { BACKEND_URL } from "../../config";

let globalTags: string[] = [];

// Define a type for the structure that holds business types with their tags
type BusinessTypeWithTags = {
  categoryName: string;
  tags: string[];
};

const AdminTagsReviews: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAddBusinessModal, setShowAddBusinessModal] = useState(false);
  const [newBusinessType, setNewBusinessType] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newTags, setNewTags] = useState<string[]>([]);
  const [businessTypesWithTags, setBusinessTypesWithTags] = useState<BusinessTypeWithTags[]>([]);
  const [businessCategoryWithTagstoAdd, setBusinessCategoryWithTagstoAdd] = useState<BusinessTypeWithTags>(
    {categoryName:"", tags: []} 
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "SpotBiz | Business Types & Tags | Admin";
    if (newTags.length > 0) {
      console.log("Updated tags array:", newTags);
    }
  }, [newTags]);

  const handleBusinessTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBusinessType(e.target.value); // Update the business type
    globalTags = []; // Clear the globalTags array when business type changes
    setNewTags([]); // Clear the state tags array if you're using it
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      // Update the tags list using functional form of setState
      setNewTags((prevTags) => {
        const updatedTags = [...prevTags, newTag];
        // console.log("New tags array inside setState:", updatedTags); // Log before state is updated
        return updatedTags; // Return the new updated state
      });
      // setMyTags(newTags)
      // console.log(myTags);
      globalTags.push(newTag)
      console.log("these are global tags" + globalTags);

      
      setBusinessCategoryWithTagstoAdd((prevState) => ({
        ...prevState, // Spread the existing categoryName and tags
        tags: [...prevState.tags, newTag], // Add the new tag to the tags array
      }));
      setNewTag("");
    }
  };

  

  const handleRemoveTag = (index: number) => {
    const updatedTags = newTags.filter((_, i) => i !== index);
    setNewTags(updatedTags);
  };

  const handleAddBusinessType = async () => {
    console.log(businessCategoryWithTagstoAdd)
    if (newTags.length > 0) {
      // Add new business type with its tags to the array
      console.log("global tags here " + globalTags);
      
      try{
        console.log(businessCategoryWithTagstoAdd);
        
        const response = await fetch(`${BACKEND_URL}/admin/business_type/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(businessCategoryWithTagstoAdd),
        });

        if (!response.ok) {
          console.error("error occured")
        } else{
          console.log("i am here");
          
          setBusinessTypesWithTags([
            ...businessTypesWithTags,
            { categoryName: newBusinessType, tags: globalTags }
          ]);
          
          console.log(businessTypesWithTags);
        }
  
        
        
        
      } catch(e){
        console.error(e)
      }
    }
    console.log("end if");
    
    // Reset modal inputs and close modal
    setShowAddBusinessModal(false);
    setNewBusinessType("");
    setNewTags([]);
    
  };


  // const handleAddBusinessType = async () => {
  //   if (newBusinessType.trim() !== "" && newTags.length > 0) {
  //     setLoading(true);
  //     try {
  //       // Prepare the data to be sent
  //       const businessCategoryWithTagstoAdd = {
  //         categoryName: newBusinessType,
  //         tags: newTags,
  //       };
  
  //       const response = await fetch("/add", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(businessCategoryWithTagstoAdd),
  //       });
  
  //       setLoading(false);
  
  //       if (response.ok) {
  //         const result = await response.json();
  //         console.log("Category added successfully:", result);
  
  //         // Update local state with the new business type and tags
  //         setBusinessTypesWithTags((prev) => [
  //           ...prev,
  //           { categoryName: newBusinessType, tags: newTags },
  //         ]);
  
  //         // Reset modal inputs and close modal
  //         setShowAddBusinessModal(false);
  //         setNewBusinessType("");
  //         setNewTags([]);
  //       } else {
  //         const errorData = await response.json();
  //         setError(`Failed to add category: ${errorData.error}`);
  //       }
  //     } catch (err) {
  //       setLoading(false);
  //       setError("Error adding category. Please try again.");
  //     }
  //   } 
  // };
  

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Business Types & Tags" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex-grow mt-16">
          <div className="flex justify-between items-center w-full mb-10">
            <h1 className="text-subsubheading text-bluedark">Business Types & Tags</h1>
            <div
              onClick={() => setShowAddBusinessModal(true)}
              className="relative flex items-center justify-center w-[40px] h-[40px] mt-0 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <FaPlus className="text-xl text-gray-500" />
            </div>
          </div>
          <div className="mt-8">
            <BusinessTypesTable showModal={showModal} setShowModal={setShowModal} />
          </div>
          {/* Display list of business types and their tags */}
          <div className="mt-8">
            {businessTypesWithTags.map((business, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md shadow-md">
                <h2 className="text-lg font-semibold">{business.categoryName}</h2>
                <div className="flex flex-wrap mt-2">
                  {business.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center bg-blue-200 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Business Type Modal */}
      {showAddBusinessModal && (
        <Modal show={showAddBusinessModal} size="lg" onClose={() => setShowAddBusinessModal(false)}>
          <Modal.Header>Add Business Type</Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <input
                type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter business type"
                value={businessCategoryWithTagstoAdd.categoryName}
                onChange={(e) => {setBusinessCategoryWithTagstoAdd({...businessCategoryWithTagstoAdd, categoryName:e.target.value})}} 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="relative">
                <input
                  type="text"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-10"
                  placeholder="Enter a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-2"
                  onClick={handleAddTag}
                >
                  <FaPlus className="text-gray-500" />
                </button>
              </div>
              <div className="flex flex-wrap mt-2">
                {newTags.map((tag, index) => (
                  <span
                    key={index}
                    className="relative inline-flex items-center bg-gray-200 text-gray-700 rounded-full px-4 py-1.5 text-sm font-medium mb-2 mr-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="ml-2 text-gray-600 hover:text-gray-800"
                    >
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-center space-x-4 w-full">
              <button
                className="px-6 py-3 text-sm font-medium text-white bg-gray-800 rounded-xl"
                onClick={handleAddBusinessType}
              >
                Add Business Type
              </button>
              <button
                type="button"
                className="px-6 py-3 text-sm font-medium text-white bg-gray-500 rounded-xl"
                onClick={() => setShowAddBusinessModal(false)}
              >
                Cancel
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default AdminTagsReviews;