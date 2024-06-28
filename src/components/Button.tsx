interface ButtonProps {
    name: string;
    fun?: () => void;
}

function Button({name}: ButtonProps){
    return(
        <button className="px-4 py-2 font-semibold text-white bg-bluedark rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2">
        {name}
      </button>
    )
}

export default Button;