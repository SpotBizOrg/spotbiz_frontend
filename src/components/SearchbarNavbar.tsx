import { ChangeEvent } from "react";

interface SearchbarNavbarProps {
    searchTerm: string;
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    doSearch?: () => void;

}

function SearchbarNavbar({searchTerm, handleSearchChange, doSearch}: SearchbarNavbarProps){
    return(
        <>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search the category or service"
                  className="pl-2  block w-full rounded-md border border-gray-300 placeholder-gray-400 focus:border-gray-100 focus:ring-gray-100 sm:text-sm"
                />
                <div className='mx-px border border-gray-300 flex ietms-center justify-center rounded w-10 bg-gray-200 hover:bg-gray-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500  hover:text-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
       
        </>
       
    )
}

export default SearchbarNavbar;