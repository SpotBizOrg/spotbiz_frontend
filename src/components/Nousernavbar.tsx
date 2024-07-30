import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../assets/logo.png';
import Button from './Button'; // Assuming the file path is correct and the file exists
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Nousernavbar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');


    function navigateToPage() {
      navigate('/customer/search_results');
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const doSearch = () => {
        console.log(searchTerm);
    };

    const handleSearch = () => {
      const searchQuery = searchTerm.trim(); 
    
      if (searchQuery) {
        navigate('/customer/search_results', { state: { query: searchQuery } });
      } else {
      }
    };

    return (
        // <Disclosure as="nav" className="bg-white shadow-bottom fixed top-0 left-0 right-0 z-50">
        //     {({ open }) => (
        //         <>
        //             <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
        //                 <div className="relative flex h-16 items-center justify-between">
        //                     <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        //                         {/* Mobile menu button */}
        //                         <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        //                             <span className="absolute -inset-0.5" />
        //                             <span className="sr-only">Open main menu</span>
        //                             {open ? (
        //                                 <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        //                             ) : (
        //                                 <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
        //                             )}
        //                         </DisclosureButton>
        //                     </div>
        //                     <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        //                         <div className="flex flex-shrink-0 items-center">
        //                             <img
        //                                 className="h-8 w-auto"
        //                                 src={Logo}
        //                                 alt="SpotBiz Logo"
        //                             />
        //                         </div>
        //                         <div className="hidden sm:ml-6 sm:flex">
        //                             <input
        //                                 type="text"
        //                                 value={searchTerm}
        //                                 onChange={handleSearchChange}
        //                                 placeholder="Search the category or service"
        //                                 className="ml-4 pl-2 pr-2 block w-96 rounded-md border border-gray-300 placeholder-gray-400 focus:border-gray-100 focus:ring-gray-100 sm:text-sm"
        //                             />
        //                             <div onClick={doSearch} className='mx-px border border-gray-300 flex items-center justify-center p-1 rounded w-10 bg-gray-200 hover:bg-gray-300 cursor-pointer'>
        //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500 hover:text-black">
        //                                     <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        //                                 </svg>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        //                         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        //                             <Button name="Login" />
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //             <DisclosurePanel className="sm:hidden">
        //                 <div className="space-y-1 px-2 pb-3 pt-2">
        //                     <div className="flex px-2 pt-2 pb-3">
        //                         <input
        //                             type="text"
        //                             value={searchTerm}
        //                             onChange={handleSearchChange}
        //                             placeholder="Search the category or service"
        //                             className="pl-2 block w-full rounded-md border border-gray-300 placeholder-gray-400 focus:border-gray-100 focus:ring-gray-100 sm:text-sm"
        //                         />
        //                         <div onClick={doSearch} className='mx-px border border-gray-300 flex items-center justify-center p-1 rounded w-10 bg-gray-200 hover:bg-gray-300 cursor-pointer'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500 hover:text-black">
        //                                 <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        //                             </svg>
        //                         </div>
        //                     </div>
        //                     <div className="space-y-1 px-2 pt-2 pb-3">
        //                         <Button name="Login" />
        //                     </div>
        //                 </div>
        //             </DisclosurePanel>
        //         </>
        //     )}
        // </Disclosure>
        <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button 
                // onClick={toggleSidebar} 
                aria-controls="logo-sidebar" 
                type="button" 
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <a href="/" className="flex ms-2 md:me-24">
                <img src={Logo} className="h-8 me-3" alt="FlowBite Logo" />
              </a>
              
            </div>
            <div className='flex w-2/5 items-center justify-start rtl:justify-end'>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none p-0">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    </div>
                    <input type="text" id="simple-search" value={searchTerm} onChange={handleSearchChange} className="bg-gray-50 border p-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What are you looking for" required />
                </div>
                <button onClick={handleSearch} className="p-2 ms-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark  hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex justify-between items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
                className="flex mr-5 w-full justify-center rounded-md bg-bluedark px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => navigate('/register')}
              >
                SignUp
              </button>
            <button
                className="flex w-full justify-center rounded-md bg-bluedark px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </div>
        </div>
    </nav>
    );
}

export default Nousernavbar;