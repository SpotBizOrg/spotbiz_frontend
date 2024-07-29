const OpeningHrs: React.FC = () => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md mb-10 border border-gray-300">
            <div className="p-2 border border-gray-400 rounded text-center">
                <p className="font-bold text-bluedark text-bodymedium">Opening Hours</p>
            </div>
            <div className="p-4 text-gray-800 text-bodysmall">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
            </div>
        </div>
    )
}

export default OpeningHrs;