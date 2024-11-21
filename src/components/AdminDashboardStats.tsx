const AdminDashboardSats: React.FC = () => {
    return(
        <div className="flex flex-row gap-4">
            <div className="bg-white p-8 basis-1/3 rounded shadow-lg shadow-grey text-center flex-col w-full sm:w-60 md:w-80 lg:w-96 flex  justify-center">
                <h2 className="text-xl font-medium">Businesses</h2>
                <div className="text-3xl font-bold">45</div>
                <div className="text-gray-500">Total Businesses</div>
            </div>
            <div className="bg-white p-8 basis-1/3 rounded shadow-lg shadow-grey text-center flex-col w-full sm:w-60 md:w-80 lg:w-96 flex  justify-center">
                <h2 className="text-xl font-medium">Customers</h2>
                <div className="text-3xl font-bold">45</div>
                <div className="text-gray-500">Total Customers</div>
            </div>
            <div className="bg-white p-8 basis-1/3 rounded shadow-lg shadow-grey text-center flex-col w-full sm:w-60 md:w-80 lg:w-96 flex  justify-center">
                <h2 className="text-xl font-medium">Revenue</h2>
                <div className="text-3xl font-bold">45</div>
                <div className="text-gray-500">Total Revenue</div>
            </div>
        </div>
    )
}

export default AdminDashboardSats;