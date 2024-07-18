import React, { useState } from "react";
import Container from "../components/Container";
import Businessnavbar from "../components/Businessnavbar";
import Plate from "../components/Plate";
import Plate2 from "../components/Plate2";
import Businesssidebar from "../components/Businesssidebar";

const Banned: React.FC = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <Container>
      <Businesssidebar />
      <div className="flex-1 flex flex-col">
        <Businessnavbar />
        <div className="flex flex-row items-center">
          <div className="w-1/6 bg-gray-100">this is another div</div>
          <div className="flex flex-col w-5/6 h-screen items-center justify-center">
            <Plate />
            <div className="p-5"></div>
            <Plate2 />
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-30">
          <div className="bg-white w-2/3 p-12 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-4">User Banned!</h3>
            <p className="text-gray-600 mb-6 text-center">
              This user has been banned. If you want to revoke this action, click the button below to request an appeal.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 px-4 bg-primary text-white text-lg rounded-md hover:bg-primary"
            >
              Request Appeal
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Banned;
