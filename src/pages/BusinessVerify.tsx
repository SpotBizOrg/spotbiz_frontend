import { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BACKEND_URL } from "../../config";
import { useAuth } from "../utils/AuthProvider";

interface User {
  userId: Number;
  name: String;
  email: String;
}

interface Business {
  businessId: Number;
  businessRegNo: String;
  name: String;
  user: User;
}

function BusinessVerify() {
  const [items, setItems] = useState<Business[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState<Number | null>(null);
  const { user, checkAuthenticated, login } = useAuth();
  
  const fetchBusinessData = () => {
    fetch(`${BACKEND_URL}/admin/check_registration`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    document.title = "SpotBiz | Business Verify | Admin";
    fetchBusinessData();

    if (!checkAuthenticated() || user?.role != "ADMIN") {
      login();
    }
  }, []);

  const handleVerify = () => {
    setShowPopup(false);

    fetch(`${BACKEND_URL}/admin/verify/${currentBusinessId}`)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Failed to verify business');
        }
      })
      .then((data) => {
        console.log(data);
        // setShowPopup(false);
        fetchBusinessData(); // Fetch the data again to update the table
      })
      .catch((error) => {
        console.error(error);
        setShowPopup(false); // Close the modal if there's an error
      });
  };

  return (
    <>
      <Container>
        <Adminnavbar />
        <Adminsidebar selectedTile="Business Verification" />

        <div className="px-12 sm:ml-64 mt-20">
          <div className="w-fit mb-10 border-b-gray-900">
            <h1 className="text-subsubheading text-bluedark">Business Verify Requests</h1>
          </div>

          <div className="relative  overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
            {items ?(<table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>Business ID</th>
                  <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                    <div className="flex items-center">Business Reg No</div>
                  </th>
                  <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                    <div className="flex items-center">Business Name</div>
                  </th>
                  <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>
                    <div className="flex items-center">Representer Name</div>
                  </th>
                  <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>
                    <div className="flex items-center">Representer Email</div>
                  </th>
                  <th scope="col" className="px-6 py-3 " style={{ minWidth: '150px' }}>
                    <div className="flex items-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.businessId.toString()}
                    </th>
                    <td className="px-6 py-4">{item.businessRegNo}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.user.name}</td>
                    <td className="px-6 py-4">{item.user.email}</td>
                    <td className="px-0 py-4 flex gap-0 justify-start">
                      <Button
                        color="dark"
                        size="xs"
                        onClick={() => {
                          setCurrentBusinessId(item.businessId);
                          setShowPopup(true);
                        }}
                      >
                        Take Action
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>):(
              <div className="flex items-center justify-center h-32">
                No business verification requests
              </div>
            )}
          </div>
        </div>
      </Container>
      <Modal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        popup
        className="flex items-center justify-center fixed inset-0 z-50"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg", 
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header />
        <Modal.Body className="p-0">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to mark verify this business?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleVerify}>
                {"Yes, I'm sure"}
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowPopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BusinessVerify;
