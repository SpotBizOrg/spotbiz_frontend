import { Button, Label, Modal, TextInput } from "flowbite-react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

interface ReimbursementsProps {
  requestedDate: Date;
  amount: number;
  status: string;
  id: number;
  businessName: string;
  images: string;
}

interface BusinessAccountDetails {
  id: number;
  accountNo: string;
  accountHolderName: string;
  bankName: string;
  branchName: string;
  phoneNo: string;
  email: string;
}

const AdminCuponReimburse: React.FC = () => {
  const [currentItemId, setCurrentItemId] = useState(0);
  const [acceptPopup, setAcceptPopup] = useState(false);
  const [declinePopup, setDeclinePopup] = useState(false);
  const [reimbursements, setReimbursements] = useState<ReimbursementsProps[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [accountDetails, setAccountDetails] =
    useState<BusinessAccountDetails>();
  const [isAccDetailsPopUpOpen, setIsAccDetailsPopUpOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    { image: string; discount: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowImages = (imagesString: string | undefined) => {
    if (!imagesString || typeof imagesString !== "string") {
      console.error("Invalid imagesString:", imagesString);
      return;
    }

    const imagesArray = imagesString
      .split(",")
      .reduce((acc: any[], curr, index, arr) => {
        if (index % 2 === 0) {
          acc.push({ image: curr, discount: arr[index + 1] });
        }
        return acc;
      }, []);

    setSelectedImages(imagesArray);
    console.log("Images array:", imagesArray);
    setIsModalOpen(true);
  };

  const handleDecline = () => {
    alert("decline button was clicked");
    setDeclinePopup(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const url = `${BACKEND_URL}/reimbursements`;

    try {
      const response = await axios.get(url);
      console.log("Response received:", response.data);

      const transformedData: ReimbursementsProps[] = response.data.map(
        (item: any) => ({
          requestedDate: item.dateTime,
          amount: item.amount,
          status: item.status,
          id: item.id,
          businessName: item.businessName,
          images: item.images,
        })
      );

      setReimbursements(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const payTo = async () => {
    console.log(currentItemId);
    setLoading(true);
    const url = `${BACKEND_URL}/reimbursements/${currentItemId}/PAYED`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setAcceptPopup(false);
        toast.success("The discount coupon used successfully!");
        fetchData();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (e) {
      console.log("An error occured: " + e);
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessAccountDetails = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BACKEND_URL}/business_account_details/reimburse_id/${id}`,
        {
          method: "GET",
        }
      );
      if (response.status === 200) {
        const accountDetails = await response.json();
        console.log("Account details:", accountDetails);
        setAccountDetails(accountDetails);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log("An error occurred: " + e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "SpotBiz | Admin | Coupons";

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <Adminnavbar />
        <Adminsidebar selectedTile="Coupon Reimburse" />
        <div className="px-12 sm:ml-64 mt-20">
          <div className="w-full mb-10 border-b boder-gray-900">
            <h1 className="text-subsubheading text-bluedark">
              Coupon Reimburse
            </h1>
          </div>

          <div className="relative  overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "100px" }}
                  >
                    <div className="flex items-center">Ticket ID</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "150px" }}
                  >
                    <div className="flex items-center">Business Name</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "100px" }}
                  >
                    <div className="flex items-center">Requested Date</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "150px" }}
                  >
                    <div className="flex items-center">Amount</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "150px" }}
                  >
                    <div className="flex items-center">Status</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "150px" }}
                  >
                    <div className="flex items-center">Bill Image(s)</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={{ minWidth: "100px" }}
                  >
                    <div className="flex items-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {reimbursements.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.id.toString()}
                    </th>
                    <td className="px-6 py-3">{item.businessName}</td>
                    <td className="px-6 py-3">
                      {item.requestedDate == null
                        ? new Date().toLocaleDateString()
                        : new Date(item.requestedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{item.amount}</td>
                    <td className="px-6 py-3">{item.status}</td>
                    <td className="px-6 py-3">
                      <button
                        className="bg-bluedark text-white px-2 py-2 rounded"
                        onClick={() => {
                          console.log(item.images);
                          handleShowImages(item.images);
                        }}
                      >
                        Show Images
                      </button>
                    </td>
                    <td className="px-6 py-3 flex gap-0 justify-start">
                      <Button
                        color="dark"
                        size="xs"
                        onClick={() => {
                          setCurrentItemId(item.id);
                          fetchBusinessAccountDetails(item.id);
                          setIsAccDetailsPopUpOpen(true);
                        }}
                      >
                        Pay
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-12 sm:ml-64 mt-20 z-50">
          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <HashLoader color="#36d7b7" size={50} />
            </div>
          )}
        </div>
      </Container>

      <Modal
        show={acceptPopup}
        onClose={() => setAcceptPopup(false)}
        popup
        className="flex items-center justify-center min-h-screen z-40"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header />
        <Modal.Body className="p-10">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to pay?
            </h3>
            <div className="flex justify-center gap-6">
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => payTo()}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() => setAcceptPopup(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={declinePopup}
        onClose={() => setDeclinePopup(false)}
        popup
        className="flex items-center justify-center min-h-screen z-40"
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
              Are you sure you want to decline this coupon?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDecline}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() => setDeclinePopup(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={isAccDetailsPopUpOpen}
        onClose={() => setIsAccDetailsPopUpOpen(false)}
        size="lg"
        className="flex items-center justify-center min-h-screen  z-40"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header className="text-center">
          Account details of the selected business.
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-2 flex flex-col items-center">
            <div className="w-full">
              <Label htmlFor="purpose">Bank Name</Label>
              <TextInput
                id="purpose"
                type="text"
                value={accountDetails?.bankName}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="purpose">Branch Name</Label>
              <TextInput
                id="purpose"
                type="text"
                value={accountDetails?.branchName}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="purpose">Account Holder's Name</Label>
              <TextInput
                id="purpose"
                type="text"
                value={accountDetails?.accountHolderName}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="purpose">Account Number</Label>
              <TextInput
                id="purpose"
                type="number"
                value={accountDetails?.accountNo}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="purpose">Phone number</Label>
              <TextInput
                id="purpose"
                type="text"
                value={accountDetails?.phoneNo}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="purpose">Email</Label>
              <TextInput
                id="purpose"
                type="text"
                value={accountDetails?.email}
                className="w-full"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={() => {
              setAcceptPopup(true);
              setIsAccDetailsPopUpOpen(false);
            }}
          >
            Proceed
          </button>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
            onClick={() => setIsAccDetailsPopUpOpen(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="xl"
        className="flex items-center justify-center p-10 z-40"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header className="text-center">
          Images and Discounts
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4 overflow-y-auto max-h-96">
            {selectedImages.map(({ image, discount }, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start pb-4 mb-4"
              >
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className="w-[800px] h-auto object-cover rounded border-2 border-gray-100"
                />
                <span className="text-lg font-medium ml-4">
                  Discount: {discount}%
                </span>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminCuponReimburse;