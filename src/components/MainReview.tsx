import { FaFlag, FaPlus, FaStar } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";

const MainReview: React.FC = () => {
    return (
        <>
        <div className="max-w-sm p-4 bg-white rounded-lg shadow-md border border-gray-200 text-bodysmall">
      <div className="mb-2">
        <p className="font-semibold text-gray-800">S.A.Edirisinghe</p>
        <div className="flex items-center text-yellow-400">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </div>
      <p className="text-gray-700 mb-4">
        The selection of electronics and computers is top-notch and always up-to-date.
      </p>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-body">July 28</span>
        <button className="text-sm bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-500">
          See more
        </button>
      </div>
    </div>
    <div className="flex p-2 gap-6 flex-row justify-end text-bodysmall text-gray-600">
    <div className="flex flex-row items-center gap-2 cursor-pointer">
        <HiPencilAlt /><p>Add</p>
    </div>
    <div className="flex flex-row items-center gap-2 cursor-pointer">
        <FaFlag /><p>Report</p>
    </div>
    </div>
        </>
        
    )
}

export default MainReview;