// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Nousernavbar from './components/Nousernavbar'
import Customernavbar from './components/Customernavbar'
import Businessnavbarsidebar from './components/Businessnavbarsidebar';
import Adminnavbarsidebar from './components/Adminnavbarsidebar';
import Header from './components/Header';
import Categories from './components/Categories';
import HowToFindShop from './components/HowToFindShop';
import HowToRegisterBusiness from './components/HowToRegisterBusiness';
import Recommendations from './components/Recommendations';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Registration from './components/Regitration';
import SignupFormBusiness from './components/SignupFormBusiness';
import SignupFormCustomer from './components/SignUpForm';
import SignupInProgress from './components/SignupInProgress';
import Banned from './components/Banned';
import CustomerHome from './components/CustomerHome';
import Guided from './pages/Guided'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guided2 from './pages/Guided2';
import Guided3 from './pages/Guided3';
import AdminVerify from './pages/BusinessVerify';
// import Header from './components/Header';


const Home = () => (
	<div className="font-sans">
	  <Header />
	  <Categories />
	  <HowToFindShop />
	  <HowToRegisterBusiness />
	  <Recommendations />
	  <ContactUs />
	</div>
  );

function App() {
 

  return (

	<BrowserRouter>
		<Routes>
		    <Route path="/" element={<Home />} />
			<Route path="/customerhome" element={<CustomerHome/>}/>
			<Route path = "/customerNavbar" element={<Customernavbar/>}/>
			<Route path = "/banned" element={<Banned/>}/>
			<Route path="login" element={<Login/>}/>
			<Route path="/register" element={<Registration />} />
			<Route path="/guided" element={<Guided2 />} />
			<Route path="/guided3" element={<Guided3 />} />
			<Route path="/admin_verify" element={<AdminVerify />} />
			<Route path="/signup-business" element={<SignupFormBusiness/>}/>
			<Route path="/signup-customer" element={<SignupFormCustomer/>}/>
			<Route path="/signup-in-process" element={<SignupInProgress/>}/>
			{/* <Route path="/header" element={<Header />}/> */}
	
		</Routes>
	</BrowserRouter>

	
  )
}

export default App
