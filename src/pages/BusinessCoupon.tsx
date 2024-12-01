import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Businessnavbar from "../components/Businessnavbar";
import Businesssidebar from "../components/Businesssidebar";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { format } from "date-fns";

interface ScannedCouponProps {
  scannedCouponId: number;
  couponId: number;
  dateTime: Date;
  discount: number;
  status: "PENDING" | "ISSUED" | "USED" | "DELETED";
  billImage: File | null;
}

interface BusinessAccountDetails {
  accountNo: number | undefined;
  accountHolderName: string;
  bankName: string;
  branchName: string;
}

const BusinessCupon: React.FC = () => {
  const [coupons, setCoupons] = useState<ScannedCouponProps[]>([]);
  const storedEmail = localStorage.getItem("email");
  const [businessId, setBusinessId] = useState(4);
  const [openScanCode, setOpenScanCode] = useState(false);
  const [isAccDetailsPopUpOpen, setIsAccDetailsPopUpOpen] = useState(false);
  const [openEnterAmount, setOpenEnterAmount] = useState(false);
  const [scanCode, setScanCode] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>();
  const [couponImage, setCouponImage] = useState<File | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [couponStatus, setCouponStatus] = useState();
  const [couponDiscount, setCouponDiscount] = useState();
  const [couponId, setCouponId] = useState();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [accountDetails, setAccountDetails] = useState<BusinessAccountDetails>({
    accountNo: undefined,
    accountHolderName: "",
    bankName: "",
    branchName: "",
  });

  const fetchData = async () => {
    setLoading(true);
    const url = `${BACKEND_URL}/scanned_coupon/business/${businessId}`;

    try {
      const response = await axios.get(url);
      console.log("Fetched scanned:", response.data);

      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching business ID:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCoupon = async () => {
    if (validateCoupon()) {
      setLoading(true);
      try {
        const url = `${BACKEND_URL}/coupon/check/${scanCode}`;
        try {
          const response = await axios.get(url);
          console.log(response);
          console.log(response.data.status);
          setCouponStatus(response.data.status);
          setCouponId(response.data.coupon_id);
          if (response.data.status == "ISSUED") {
            setCouponDiscount(response.data.discount);
            setOpenScanCode(false);
            setOpenEnterAmount(true);
          } else {
            toast.error("This coupon is invalid!");
          }
        } catch (error) {
          console.error("Error fetching business ID:", error);
        }
      } catch (e) {
        console.log("An error occured: " + e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAccDetailsAdd = async () => {
    if (
      accountDetails.accountHolderName === null ||
      accountDetails.accountNo === null ||
      accountDetails.bankName === null ||
      accountDetails.branchName === null ||
      accountDetails.accountHolderName === "" ||
      accountDetails.bankName === "" ||
      accountDetails.branchName === ""
    ) {
      toast.error("Please enter all details correctly");
      return;
    }

    if (
      accountDetails.accountNo &&
      accountDetails.accountNo.toString().length <= 2
    ) {
      toast.error("Please enter account number correctly");
      return;
    }

    console.log(accountDetails.accountHolderName);

    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/business_account_details/${businessId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountDetails,
          }),
        }
      );
      if (response.status === 200) {
        toast.success("Account details saved successfully!");
        setIsAccDetailsPopUpOpen(false);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (e) {
      console.log("An error occured: " + e);
    } finally {
      setLoading(false);
    }
  };

  const useCoupon = async () => {
    let imageUrl = "";

    setLoading(true);

    if (couponImage) {
      imageUrl = await handleImageUpload(couponImage);
    } else {
      toast.error("Please upload an image!");
      setLoading(false);
      throw new Error(`Image is empty`);
    }

    const timeStamp = new Date();
    const discountValue = ((couponDiscount ?? 0) / 100) * amount!;
    console.log(discountValue + " " + couponId + " " + imageUrl);
    if (validateAmount()) {
      try {
        const response = await fetch(`${BACKEND_URL}/scanned_coupon`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            couponId: couponId,
            dateTime: format(timeStamp, "yyyy-MM-dd HH:mm:ss"),
            discount: discountValue,
            billImage: imageUrl,
            businessId: businessId,
          }),
        });

        if (response.status === 200) {
          toast.success("The discount coupon used successfully!");
          setOpenEnterAmount(false);
          fetchData();
        } else {
          toast.error("Something went wrong!");
        }
      } catch (e) {
        console.log("An error occured: " + e);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchBusinessId = async () => {
    const url = `${BACKEND_URL}/business_owner/business/${storedEmail}`;

    try {
      const response = await axios.get(url);
      setBusinessId(response.data.businessId);
    } catch (error) {
      console.error("Error fetching business ID:", error);
    }
  };

  const fetchBusinessAccountDetails = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/business_account_details/${businessId}`,
        {
          method: "GET",
        }
      );
      if (response.status === 200) {
        const accountDetails = await response.json();
        setAccountDetails(accountDetails);
        console.log("Account details:", accountDetails);
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
    document.title = "Business | Manage Coupons";

    fetchBusinessId();
  }, []);

  useEffect(() => {
    if (businessId !== 0) {
      fetchData();
    }

    fetchData();
  }, [businessId]);

  const handleRowSelect = (scannedCouponId: number) => {
    setSelectedRows((prev) =>
      prev.includes(scannedCouponId)
        ? prev.filter((id) => id !== scannedCouponId)
        : [...prev, scannedCouponId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(coupons.map((coupon) => coupon.scannedCouponId));
    }
    setSelectAll(!selectAll);
  };

  const reimburseSelected = async () => {
    if (selectedRows.length === 0) {
      toast.error("Select one or more coupons!");
      return;
    }

    const success = await fetchBusinessAccountDetails();

    if (!success) {
      setIsAccDetailsPopUpOpen(true);
      return;
    }

    console.log("Selected Coupon IDs:", selectedRows);
    const timeStamp = new Date();
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/reimbursements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessId: businessId,
          dateTime: format(timeStamp, "yyyy-MM-dd HH:mm:ss"),
          scannedCouponIds: selectedRows,
        }),
      });
      if (response.status === 200) {
        toast.success("Reimbursement requested successfully!");
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

  const validateCoupon = () => {
    if (scanCode === "" || scanCode == null) {
      toast.error("Coupon code should not be empty!");
      return false;
    }
    if (scanCode.length < 6) {
      toast.error("Coupon code should six characters");
      return false;
    }
    return true;
  };

  const validateAmount = () => {
    if (amount == null) {
      toast.error("Please enter an amount!");
      return false;
    }
    if (amount > 1000) {
      toast.error("Please enter bill amount less than Rs. 1000");
      setLoading(false);
      return false;
    }
    return true;
  };

  const handleImageUpload = async (imageFile: string | Blob) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch(`${BACKEND_URL}/upload_image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error uploading image:", errorData);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const imageUrl = await response.text();
      console.log("Image URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("An error occurred during image upload:", error);
      throw error;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCouponImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Container>
      <Businessnavbar />
      <Businesssidebar selectedTile="Discount Coupons" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex justify-between items-center w-full mb-10">
          <h1 className="text-subsubheading mb-10 text-bluedark">
            Discount Coupons
          </h1>
          <div className="flex gap-4">
            <div className="flex space-x-4 z-40">
              <Button color="dark" onClick={() => setOpenScanCode(true)}>
                Check and Use Discount Codes
              </Button>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  Scanned Coupon ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Coupon ID</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Date</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  <div className="flex items-center">Discount Given</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(coupon.scannedCouponId)}
                      onChange={() => handleRowSelect(coupon.scannedCouponId)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>{coupon.scannedCouponId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">{coupon.couponId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {coupon.dateTime == null
                        ? new Date().toLocaleString()
                        : coupon.dateTime.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">{coupon.discount}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end">
            {coupons.length > 0 && (
              <button
                onClick={reimburseSelected}
                className="m-2 px-4 py-2 bg-bluedark text-white rounded"
              >
                Request to Reimburse
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={openScanCode}
        onClose={() => setOpenScanCode(false)}
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
          Verify the coupon code
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-full">
              <Label htmlFor="purpose">Enter the coupon code</Label>
              <TextInput
                id="purpose"
                type="text"
                value={scanCode}
                onChange={(e) => setScanCode(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleVerifyCoupon}
          >
            Verify Coupon
          </button>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
            onClick={() => setOpenScanCode(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={openEnterAmount}
        onClose={() => setOpenEnterAmount(false)}
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
          Enter bill information
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-full">
              <Label htmlFor="purpose">
                Enter amount ( Less than Rs.1000 )
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  Rs.
                </span>
                <input
                  id="purpose"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
            <div className="w-full">
              <Label htmlFor="gameImage" value="Upload Bill" />
              <input
                id="gameImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border-none rounded"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-24 h-24 object-cover mt-2 border border-gray-300 rounded"
                />
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={useCoupon}
          >
            Use Coupon
          </button>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
            onClick={() => setOpenEnterAmount(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
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
          Please add your account details before proceed!
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-full">
              <Label htmlFor="purpose">Enter Bank Name</Label>
              <TextInput
                id="purpose"
                type="text"
                value={accountDetails?.bankName}
                onChange={(e) =>
                  setAccountDetails((prev) => ({
                    ...prev,
                    bankName: e.target.value,
                  }))
                }
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="purpose">Enter Branch Name</Label>
              <TextInput
                id="purpose"
                type="text"
                value={accountDetails?.branchName}
                onChange={(e) =>
                  setAccountDetails((prev) => ({
                    ...prev,
                    branchName: e.target.value,
                  }))
                }
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="purpose">Enter Account Holder's Name</Label>
              <TextInput
                id="purpose"
                type="text"
                value={accountDetails?.accountHolderName}
                onChange={(e) =>
                  setAccountDetails((prev) => ({
                    ...prev,
                    accountHolderName: e.target.value,
                  }))
                }
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="purpose">Enter Account Number</Label>
              <TextInput
                id="purpose"
                type="number"
                value={accountDetails?.accountNo}
                onChange={(e) =>
                  setAccountDetails((prev) => ({
                    ...prev,
                    accountNo: Number(e.target.value),
                  }))
                }
                className="w-full"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleAccDetailsAdd}
          >
            Add Details
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

      <div className="px-12 sm:ml-64 mt-20">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <HashLoader color="#36d7b7" size={50} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default BusinessCupon;
