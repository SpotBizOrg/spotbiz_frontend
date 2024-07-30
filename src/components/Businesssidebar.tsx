import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2Icon from '@mui/icons-material/Person2';
import CampaignIcon from '@mui/icons-material/Campaign';
import StarIcon from '@mui/icons-material/Star';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

interface BusinesssidebarProps {
  selectedTile: string;
}


interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
    ico: React.ReactNode;
    label:React.ReactNode;
  }
  
  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: 'business/dashboard', current: true, ico: <DashboardIcon/>, 
    label:<span className="ms-3">Dashboard</span>
  },
    { name: 'Profile', href: '/business/profile', current: false, ico: <Person2Icon/>,
    label:<span className="ms-3">Profile</span>
    
  },
    { name: 'Ads & Promos', href: '/business/advertisements', current: false, ico: <CampaignIcon/>,
    label:<span className="ms-3">Ads & Promos</span>
    
  },
    { name: 'Reviews', href: '/business/reviews', current: false, ico: <StarIcon/>,
    label:<span className="ms-3">Reviews</span>
    
  
  },
  ];
  
  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
  }
  



function Businesssidebar({selectedTile}:BusinesssidebarProps){

    return(
      <aside id="logo-sidebar" className={`fixed top-0 left-0  w-64 h-screen pt-20 transition-transform translate-x-0 bg-white border-r border-gray-200 sm:translate-x-0`} aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  selectedTile == item.name ? 'bg-gray-900 text-gray-100' : 'text-gray-900 hover:bg-gray-500 hover:text-gray-100',
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-lg'
                )}
              >
                {item.ico}
                {item.label}
              </a>
            </li>
          ))}
          
        </ul>
      </div>
    </aside>
    )
}

export default Businesssidebar;