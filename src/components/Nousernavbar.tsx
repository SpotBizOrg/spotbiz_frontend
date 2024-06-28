import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../assets/logo.png';
import Button from './Button'; // Assuming the file path is correct and the file exists
import { ChangeEvent, useState } from 'react';

function Nousernavbar() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const doSearch = () => {
        console.log(searchTerm);
    };

    return (
        <Disclosure as="nav" className="bg-white shadow-bottom fixed top-0 left-0 right-0 z-50">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src={Logo}
                                        alt="SpotBiz Logo"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:flex">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        placeholder="Search the category or service"
                                        className="ml-4 pl-2 pr-2 block w-96 rounded-md border border-gray-300 placeholder-gray-400 focus:border-gray-100 focus:ring-gray-100 sm:text-sm"
                                    />
                                    <div onClick={doSearch} className='mx-px border border-gray-300 flex items-center justify-center p-1 rounded w-10 bg-gray-200 hover:bg-gray-300 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500 hover:text-black">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                    <Button name="Login" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <div className="flex px-2 pt-2 pb-3">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Search the category or service"
                                    className="pl-2 block w-full rounded-md border border-gray-300 placeholder-gray-400 focus:border-gray-100 focus:ring-gray-100 sm:text-sm"
                                />
                                <div onClick={doSearch} className='mx-px border border-gray-300 flex items-center justify-center p-1 rounded w-10 bg-gray-200 hover:bg-gray-300 cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500 hover:text-black">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                <Button name="Login" />
                            </div>
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}

export default Nousernavbar;
