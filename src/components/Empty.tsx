import notfound from '../assets/notfound.png';

const Empty: React.FC = () => {
    return (

        <div className='w-full'>
            <div className="flex flex-col items-center justify-center border-2 rounded-lg border-gray-400 border-dashed p-8 h-full">
                <img src={notfound} alt="" width={150} className='mb-8'/>
                <p className='font-semibold text-2xl mb-4'>No businesses found</p>
                <p className='text-gray-500'>Try searching with a different text</p>
            </div>
        </div>
    

);
};

export default Empty;