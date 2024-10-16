import React, { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import BusinessTypesTable from "../components/BusinessTypesTable"; // Updated import
import Container from "../components/Container";
import { FaPlus } from "react-icons/fa";

const AdminTagsReviews: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "SpotBiz | Business Types & Tags | Admin"; // Updated title
  }, []);

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Business Types & Tags" /> {/* Updated sidebar title */}
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex-grow mt-16">
          <div className="flex justify-between items-center w-full mb-10">
            <h1 className="text-subsubheading text-bluedark">
              Business Types & Tags {/* Updated page title */}
            </h1>
            <div
              onClick={() => setShowModal(true)}
              className="relative flex items-center justify-center w-[40px] h-[40px] mt-0 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <FaPlus className="text-xl text-gray-500" />
            </div>
          </div>
          <div className="mt-8">
            <BusinessTypesTable // Updated component name
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminTagsReviews;
