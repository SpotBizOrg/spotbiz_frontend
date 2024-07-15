import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import Plate from "../components/Plate";
import Plate2 from "../components/Plate2";

function BusinessVerify() {

  const products = [
    {
        name: "Apple MacBook Pro 17\"",
        color: "Silver",
        category: "Laptop",
        price: "$2999"
    },
    {
        name: "Microsoft Surface Pro",
        color: "White",
        category: "Laptop PC",
        price: "$1999"
    },
    {
        name: "Magic Mouse 2",
        color: "Black",
        category: "Accessories",
        price: "$99"
    }
];
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
                        <th scope="col" className="px-6 py-3">Product name</th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Color
                                
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Category
                                
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Price
                                
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.name}
                            </th>
                            <td className="px-6 py-4">
                                {product.color}
                            </td>
                            <td className="px-6 py-4">
                                {product.category}
                            </td>
                            <td className="px-6 py-4">
                                {product.price}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
              {/* </Plate2> */}
            </div>
        </Container>
      );
}

export default BusinessVerify;