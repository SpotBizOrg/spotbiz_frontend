import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import Logo from '../assets/logo.png';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}


function Customernavbar(){

  const navigate = useNavigate();

  function navigateToPage() {
    navigate('/customer/games');
  }

  const handleLogout = () => {
    logout();
  };

  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const { logout } = useAuth();

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen(!isNotificationMenuOpen);
  };

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    const doSearch = () => {
        console.log(searchTerm);
    }

    const handleSearch = () => {
      const searchQuery = searchTerm.trim(); 
    
      if (searchQuery) {
        navigate('/customer/search_results', { state: { query: searchQuery } });
      } else {
      }
    };

    return(
    // <Disclosure as="nav" className="bg-white shadow-bottom fixed top-0 left-0 right-0 z-50">
    //   {({ open }) => (
    //     <>
    //       <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
    //         <div className="relative flex h-16 items-center justify-between">
    //           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
    //             {/* Mobile menu button */}
    //             <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
    //               <span className="absolute -inset-0.5" />
    //               <span className="sr-only">Open main menu</span>
    //               {open ? (
    //                 <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
    //               ) : (
    //                 <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
    //               )}
    //             </DisclosureButton>
    //           </div>
    //           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
    //             <div className="flex flex-shrink-0 items-center">
    //               <img
    //                 className="h-8 w-auto"
    //                 src={Logo}
    //                 alt="SpotBiz Logo"
    //               />
    //             </div>
    //             <div className="hidden sm:ml-6 sm:flex">
               
    //             <input
    //                   type="text"
    //                   value={searchTerm}
    //                   onChange={handleSearchChange}
    //                   placeholder="Search the category or service"
    //                   className="ml-4 pl-2 pr-2 block w-96 rounded-md border border-gray-300 placeholder-gray-400 focus:border-gray-100 focus:ring-gray-100 sm:text-sm"
    //                 />
    //                 <div onClick={doSearch} className='mx-px border border-gray-300 flex ietms-center justify-center p-1 rounded w-10 bg-gray-200 hover:bg-gray-300'>
    //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500  hover:text-black">
    //                     <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    //                     </svg>
    //                 </div>
                    

    //               <div className="flex space-x-4">

                    
    //               </div>
    //             </div>

                
    //           </div>
              
    //           <div className="absolute z-50 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    //             {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
    //                 <Button name="Login" />
    //             </div> */}
    //             <button
    //               type="button"
    //               className="relative rounded-full  p-1  hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //             >
    //               <span className="absolute -inset-1.5" />
    //               <span className="sr-only">View notifications</span>
    //               <BellIcon className="h-6 w-6" aria-hidden="true" />
    //             </button>


    //             <Menu as="div" className="relative ml-3">
    //               <div>
    //                 <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
    //                   <span className="absolute -inset-1.5" />
    //                   <span className="sr-only">Open user menu</span>
    //                   <img
    //                     className="h-8 w-8 rounded-full"
    //                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //                     alt=""
    //                   />
    //                 </MenuButton>
    //               </div>
    //               <MenuItems
    //                 transition
    //                 className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    //               >
    //                 <MenuItem>
    //                   {({ active }) => (
    //                     <a
    //                       href="#"
    //                       className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-900')}
    //                     >
    //                       My Profile
    //                     </a>
    //                   )}
    //                 </MenuItem>
    //                 <MenuItem>
    //                   {({ active }) => (
    //                     <a
    //                       href="#"
    //                       className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-900')}
    //                     >
    //                       Subscribed
    //                     </a>
    //                   )}
    //                 </MenuItem>
    //                 <MenuItem>
    //                   {({ active }) => (
    //                     <a
    //                       href="#"
    //                       className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-900')}
    //                     >
    //                       Sign out
    //                     </a>
    //                   )}
    //                 </MenuItem>
    //               </MenuItems>
    //             </Menu>
    //           </div>
    //         </div>
    //       </div>

    //       <DisclosurePanel className="sm:hidden">
    //         <div className="space-y-1 px-2 pb-3 pt-2">
    //           {/* {navigation.map((item) => (
    //             <DisclosureButton
    //               key={item.name}
    //               as="a"
    //               href={item.href}
    //               className={classNames(
    //                 item.current ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white',
    //                 'block rounded-md px-3 py-2 text-base font-medium',
    //               )}
    //               aria-current={item.current ? 'page' : undefined}
    //             >
    //               {item.name}
    //             </DisclosureButton>
                
    //           ))} */}
    //           <div className="flex px-2 pt-2 pb-3">
    //             <input
    //               type="text"
    //               value={searchTerm}
    //               onChange={handleSearchChange}
    //               placeholder="Search the category or service"
    //               className="pl-2  block w-full rounded-md border border-gray-300 placeholder-gray-400 focus:border-gray-100 focus:ring-gray-100 sm:text-sm"
    //             />
    //             <div onClick={doSearch} className='mx-px border border-gray-300 flex ietms-center justify-center p-1 rounded w-10 bg-gray-200 hover:bg-gray-300'>
    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500  hover:text-black">
    //                     <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    //                 </svg>
    //             </div>
    //           </div>

    //           <div className="space-y-1 px-2 pt-2 pb-3">
    //             <Button name="Login" />
    //             </div>
    //         </div>
    //       </DisclosurePanel>
    //     </>
    //   )}
    // </Disclosure>
    <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              // onClick={toggleSidebar}
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a href="/" className="flex ms-2 md:me-24">
              <img src={Logo} className="h-8 me-3" alt="SpotBiz Logo" />
            </a>
          </div>
          <div className="flex w-2/5 items-center justify-start rtl:justify-end">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none p-0">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-50 border p-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="What are you looking for"
                required
              />
            </div>
            <button
              type="submit"
              className="p-2 ms-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSearch}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
          <div className="absolute z-50 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button onClick={navigateToPage} className="relative rounded-full p-1 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <PuzzlePieceIcon className="h-6 w-6 mr-2" />
            </button>



            <button
              type="button"
              onClick={toggleNotificationMenu}
              className="relative rounded-full p-1 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
            </button>
            {isNotificationMenuOpen && (
              <div className="absolute right-12 top-12 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Abans: 📱 Introducing the new Samsung S24! Get yours today with a special launch discount.
                </a>
              </div>
            )}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt=""
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="/Customer/profile"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-900')}
                    >
                      My Profile
                    </a>
                  )}
                </MenuItem>
              
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="/login"
                      onClick={(e) => {
                        e.preventDefault(); 
                        handleLogout();
                      }}
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-900')}
                    >
                      Sign out
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
    )
}

export default Customernavbar;