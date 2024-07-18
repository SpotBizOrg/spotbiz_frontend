import { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import Plate from "../components/Plate";
import Plate2 from "../components/Plate2";
// import Button from "../components/Button";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface Business{
        businessId: Number;
        businessRegNo: String;
        name: String;
}

function BusinessVerify() {
    const [items, setItems] = useState<Business[]>([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        document.title = "Business Verify Requests | Admin";

        fetch('http://localhost:8080/api/v1/admin/check_registration')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            setItems(data)
        })
        .catch(error => console.error(error));

    }, []);



//   const products = [
//     {
//         name: "Apple MacBook Pro 17\"",
//         color: "Silver",
//         category: "Laptop",
//         price: "$2999"
//     },
//     {
//         name: "Microsoft Surface Pro",
//         color: "White",
//         category: "Laptop PC",
//         price: "$1999"
//     },
//     {
//         name: "Magic Mouse 2",
//         color: "Black",
//         category: "Accessories",
//         price: "$99"
//     }
// ];
    return (
        <Container>
            <Adminnavbar/>
            <Adminsidebar selectedTile="Business Registration"/>

            <div className="px-12 sm:ml-64 mt-20">
              <div className="w-fit mb-10 border-b-gray-900">
                <h1 className="text-subsubheading text-bluedark">Business Verify Requests</h1>
              </div>

              {/* <Plate2> */}
              <div className="relative overflow-x-auto sm:rounded-lg border border-gray-200">
              
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">Bisiness ID</th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Business Reg No   
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Business Name   
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                
                                
                            </div>
                        </th>

                        
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.businessId.toString()}
                            </th>
                            <td className="px-6 py-4">
                                {item.businessRegNo}
                            </td>
                            <td className="px-6 py-4">
                                {item.name}
                            </td>

                            <td className="px-6 py-4 text-right">
                                {/* <Button name="Verify"/> */}
                                <Button color="dark" size="xs" onClick={() => setShowPopup(true)}>Verify</Button>
                                {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showPopup} onClose={() => setShowPopup(false)}>
            <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 bg-gray-300 opacity-30 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setShowPopup(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowPopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
            </Modal>
        </div>
              {/* </Plate2> */}
            </div>
        </Container>
      );
}

export default BusinessVerify;