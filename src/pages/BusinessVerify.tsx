import { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

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

  const handleVerify = () => {
    fetch(`http://localhost:8080/api/v1/admin/verify/${currentBusinessId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to verify business');
        }
      })
      .then((data) => {
        console.log(data);
        // Update items to trigger re-render
        // setShowPopup(false); // Close the modal after verification
        window.location.reload(); // Reload the page to reflect the changes
      })
      .catch((error) => {
        console.error(error);
        setShowPopup(false); // Close the modal if there's an error
      });
  };

  useEffect(() => {
    document.title = "Business Verify Requests | Admin";

    fetch("http://localhost:8080/api/v1/admin/check_registration")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Business Registration" />

      <div className="px-12 sm:ml-64 mt-20">
        <div className="w-fit mb-10 border-b-gray-900">
          <h1 className="text-subsubheading text-bluedark">Business Verify Requests</h1>
        </div>

        <div className="relative overflow-x-auto sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Business ID
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Business Reg No</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Business Name</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Representer Name</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Representer Email</div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                  <td className="px-6 py-4 text-right">
                    <Button
                      color="dark"
                      size="xs"
                      onClick={() => {
                        setCurrentBusinessId(item.businessId);
                        setShowPopup(true);
                      }}
                    >
                      Verify
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showPopup} onClose={() => setShowPopup(false)} popup className="flex items-center justify-center inset-2/4 inset-y-1/2">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to mark verify this business?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
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
    </Container>
  );
}

export default BusinessVerify;
