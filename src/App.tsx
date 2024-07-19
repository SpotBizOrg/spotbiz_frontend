// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Nousernavbar from './components/Nousernavbar'
import Customernavbar from './components/Customernavbar'
import Businessnavbarsidebar from './components/Businessnavbarsidebar';
import Adminnavbarsidebar from './components/Adminnavbarsidebar';
import Home from './pages/LandingPage'
import Login from './pages/Login';
import Registration from './components/Regitration';
import SignupFormBusiness from './pages/SignupFormBusiness';
import SignupFormCustomer from './pages/SignUpForm';
import SignupInProgress from './pages/SignupInProgress';
import Banned from './components/Banned';
import CustomerHome from './pages/CustomerHome';
import Guided from './pages/Guided'
// import LatestBusinesses from './components/Latetsusiness';
import AdminDashboard from './pages/AdminDashboard';
import Chart from './components/PerformanceChart';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guided2 from './pages/Guided2';
import Guided3 from './pages/Guided3';
import AdminVerify from './pages/BusinessVerify';
import AdminTagsReviews from './pages/AdminTags&Reviews';
import BusinessReviews from "./pages/BusinessReviews";
import CustomerReview from "./pages/CustomerReviews";
import Badges from "./pages/Badges";
// import Header from './components/Header';

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
			<Route path="/chart" element={<Chart/>}/>
			<Route path="/admin" element={<AdminDashboard/>}/>
			<Route path="/admintags" element={<AdminTagsReviews/>}/>
      <Route path="/customer_reviews" element={<CustomerReview />} />
      <Route path="/business_reviews" element={<BusinessReviews />} />
      <Route path="/badges" element={<Badges />} />
			{/* <Route path="/header" element={<Header />}/> */}
	
		</Routes>
	</BrowserRouter>

	
  )
}

export default App;
