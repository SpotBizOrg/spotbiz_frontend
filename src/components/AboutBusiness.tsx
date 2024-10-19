interface AboutBusinessProps {
    about: string;
}

const AboutBusiness:React.FC<AboutBusinessProps> = ({ about }) => {
    return(
        <div className="bg-white p-4 rounded-md shadow-md mb-5 border border-gray-300">
            <div className="p-2 border border-gray-400 rounded text-center">
                <p className="font-bold text-bluedark text-bodymedium">About Us</p>
            </div>
            <div className="p-4 text-gray-800 text-bodysmall">
                <p>{about}</p>

            </div>
      </div>
    )
}

export default AboutBusiness;