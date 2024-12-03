import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import StyleIcon from '@mui/icons-material/Style';
import Person3Icon from '@mui/icons-material/Person3';
import StoreIcon from '@mui/icons-material/Store';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import ExtensionIcon from '@mui/icons-material/Extension';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import WidgetsIcon from '@mui/icons-material/Widgets';
import PaymentsIcon from '@mui/icons-material/Payments';
import PaidIcon from '@mui/icons-material/Paid';

interface AdminsidebarProps {
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
  { name: 'Dashboard', href: '/admin/dashboard', current: true, ico: <DashboardIcon />, 
  label:<span className="ms-3">Dashboard</span>
},
  { name: 'Business Verification', href: '/admin/business_verify', current: false, ico: <BusinessCenterIcon />,
    label:<span className="ms-3">Business Verification</span>
},
  { name: 'Categories & Tags', href: '/admin/categories_tags', current: false, ico: <StyleIcon />,
    label:<span className="ms-3">Categories & Tags</span>

},
  { name: 'Customer List', href: '/admin/customers', current: false, ico:<Person3Icon />,
    label:<span className="ms-3">Customer List</span>
},
  { name: 'Business List', href: '/admin/businesses', current: false, ico:<StoreIcon />,
    label:<span className="ms-3">Business List</span>

},
  { name: 'Appeals & Reports', href: '/admin/appeals_reports', current: false, ico:<FlagCircleIcon />,
    label:<span className="ms-3">Appeals & Reports</span>
},
  { name: 'Games', href: '/admin/games', current: false, ico:<ExtensionIcon />,
  label:<span className="ms-3">Games</span>

},
  { name: 'Badges', href: '/admin/badges', current: false, ico:<LocalPoliceIcon />,
    label:<span className="ms-3">Badges</span>

},
  { name: 'Coupons', href: '/admin/coupons', current: false, ico: <RequestQuoteIcon />,
    label:<span className="ms-3">Coupons</span>

},
  { name: 'Subscription Packages', href: '/admin/packages', current: false, ico:<WidgetsIcon />,
    label:<span className="ms-3">Subscription Packages</span>

},
  { name: 'Coupon Reimburse', href: '/admin/reimburse', current: false, ico:<PaymentsIcon />,
    label:<span className="ms-3">Coupon Reimburse</span>

},
  { name: 'Transactions', href: '/admin/transactions', current: false, ico:<PaidIcon />,
    label:<span className="ms-3">Transactions</span>

},
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

  


function Adminsidebar({selectedTile}:AdminsidebarProps){
    return(
            
      <aside id="logo-sidebar" className={`fixed top-0 left-0 w-64 h-screen pt-20 transition-transform translate-x-0 bg-white border-r border-gray-200 sm:translate-x-0`} aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {navigation.map((item) => (
             <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  selectedTile === item.name ? 'bg-gray-900 text-gray-100' : 'text-gray-900 hover:bg-gray-500 hover:text-gray-100',
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

export default Adminsidebar;