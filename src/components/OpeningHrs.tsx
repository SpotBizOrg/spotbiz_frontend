const OpeningHrs: React.FC = () => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md mb-10 border border-gray-300">
            <div className="p-2 border border-gray-400 rounded text-center">
                <p className="font-bold text-bluedark text-bodymedium">Opening Hours</p>
            </div>
            <div className="p-4 text-gray-800 text-bodysmall">
                <div className="mb-2">
                <p className="inline font-bold">Monday: </p> <p className="inline"> 9:00 AM - 6:00 PM</p>
                </div>
                <div className="mb-2">
                <p className="inline font-bold">Tuesday: </p> <p className="inline"> 9:00 AM - 6:00 PM</p>

                </div >
                <div className="mb-2">
                <p className="inline font-bold">Wednesday: </p> <p className="inline"> 9:00 AM - 6:00 PM</p>

                </div>
                <div className="mb-2">
                <p className="inline font-bold">Thursday: </p> <p className="inline"> 9:00 AM - 6:00 PM</p>

                </div>
                <div className="mb-2">
                <p className="inline font-bold">Friday: </p> <p className="inline"> 9:00 AM - 6:00 PM</p>

                </div>
                <div className="mb-2">
                <p className="inline font-bold">Saturday: </p> <p className="inline"> 9:00 AM - 5:00 PM</p>

                </div>
                <div>
                <p className="inline font-bold">Sunday:</p> <p className="inline"> Closed</p>

                </div>
            </div>
        </div>
    )
}

export default OpeningHrs;