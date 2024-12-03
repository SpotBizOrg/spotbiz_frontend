import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BellIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import Logo from '../assets/logo.png';
import default_user_icon from '../assets/default_user_icon.png';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'flowbite-react';
import { BACKEND_URL, resetNotificationCount, getNotificationCount} from '../../config';
import axios from 'axios';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

function Customernavbar2(){
  const { user, logout } = useAuth();
  const user_id = user?.user_id;
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const NOTIFICATION_COUNT = getNotificationCount();
  const storedUserId = localStorage.getItem('user_id');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [defaultPic, setDefaultPic] = useState<string | null>(null);


  const handleNotification = async () => {
    if (user_id != null) {
      try {
        const response = await fetch(`${BACKEND_URL}/notification/all/${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
        }

        const responseData = await response.json();
        setNotifications(responseData.slice(0, 10));
        
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
  };

  function navigateToPage() {
    navigate('/customer/games');
  }

  const toggleNotificationMenu = () => {
    handleNotification();
    resetNotificationCount();
    console.log(NOTIFICATION_COUNT)
    setNotificationMenuOpen(!isNotificationMenuOpen);
  };

  const getProfilePic = async () => {
    const url = `${BACKEND_URL}/customer/pics/${storedUserId}`;

    try{
      const response = await axios.get(url);
      console.log(response.data);
      
      setProfilePic(response.data.imageUrl);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const getAllProfilePics = async () => {
    const url = `${BACKEND_URL}/customer_pic/all`;

    try{
      const response = await axios.get(url);
      
      const defaultPic = response.data.find((pic: any) => pic.picId === 1).imageUrl;
      setDefaultPic(defaultPic);

    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  useEffect(() => {
    getProfilePic()
    getAllProfilePics()
    
  }, []);

  return(
  <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start rtl:justify-end">
          <button
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
          <a href="/home" className="flex ms-2 md:me-24">
            <img src={Logo} className="h-8 me-3" alt="FlowBite Logo" />
          </a>
        </div>
        <div className="absolute z-50 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <Tooltip content="Games">
          <button onClick={navigateToPage} className="relative rounded-full p-1 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <PuzzlePieceIcon className="h-6 w-6 mr-2" />
          </button>
        </Tooltip>
        <Tooltip content="Notifications">
        <button
            type="button"
            onClick={toggleNotificationMenu}
            className="relative rounded-full p-1 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" />
            {NOTIFICATION_COUNT > 0 && (
                <span className="h-4 w-2 absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {NOTIFICATION_COUNT}
                </span>
              )}
          </button>
        </Tooltip>
        {isNotificationMenuOpen && (
          <div className="absolute right-12 top-12 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-1">
            {notifications.length > 0 ? (
              notifications.map((notification: any, index: number) => (
                <a
                  key={index}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="mr-4 text-xs text-gray-500">[{notification.dateTime}]</span>
                  {notification.title}: {notification.description}
                </a>
              ))
            ) : (
              <p className="block px-4 py-2 text-sm text-gray-700">No notifications available.</p>
            )}
          </div>
        )}
          <Menu as="div" className="relative ml-3">
            <div>
              <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={profilePic || defaultPic ||  default_user_icon}                  // src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
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

export default Customernavbar2;