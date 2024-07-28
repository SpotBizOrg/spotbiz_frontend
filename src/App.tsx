import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/LandingPage";
import Login from "./pages/Login";
import Registration from "./components/Regitration";
import SignupFormBusiness from "./pages/SignupFormBusiness";
import SignupFormCustomer from "./pages/SignUpForm";
import SignupInProgress from "./pages/SignupInProgress";
import Banned from "./components/Banned";
import CustomerHome from "./pages/CustomerHome";
import Guided2 from "./pages/Guided2";
import Guided3 from "./pages/Guided3";
import AdminVerify from "./pages/BusinessVerify";
import Packages from "./pages/BusinessPackages";
import AdminTagsReviews from "./pages/AdminTags&Reviews";
import BusinessReviews from "./pages/BusinessReviews";
import CustomerReview from "./pages/CustomerReviews";
import Badges from "./pages/Badges";
import CustomerProfile1 from "./pages/CustomerProfile";
import BusinessProfile1 from "./pages/BusinessProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPackages from "./pages/AdminPackages";
import Chart from "./components/PerformanceChart";
import SearchResults from "./pages/SearchResults";
import BusinessDashboard from "./pages/BusinessDashboard";
import CustomerGame from "./pages/CustomerGame";
import ManageGames from "./pages/ManageGames";
import CustomerProfile from "./pages/CustomerProfile2";
import BusinessProfile from "./pages/BusinessProfile2";
import ManageCoupons from './pages/ManageCoupons';
import Reports from "./pages/Reports&Appeals";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerhome" element={<CustomerHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/guided" element={<Guided2 />} />
        <Route path="/guided3" element={<Guided3 />} />
        <Route path="/admin_verify" element={<AdminVerify />} />
        <Route path="/signup-business" element={<SignupFormBusiness />} />
        <Route path="/signup-customer" element={<SignupFormCustomer />} />
        <Route path="/signup-in-process" element={<SignupInProgress />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admintags" element={<AdminTagsReviews />} />
        <Route path="/customer_reviews" element={<CustomerReview />} />
        <Route path="/business_reviews" element={<BusinessReviews />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/Business_profile" element={<BusinessProfile />} />{" "}
        <Route path="/Customer_profile" element={<CustomerProfile />} />
        <Route path="/cus_profile" element={<CustomerProfile1 />} />
        <Route path="/bus_profile" element={<BusinessProfile1 />} />
        <Route path="/search" element={<SearchResults />} /> 
        <Route path="/manage_coupons" element={<ManageCoupons />} /> 
        <Route path="/admin_packages" element={<AdminPackages />} />
        <Route path="/bus_dashboard" element={<BusinessDashboard />} />
        <Route path="/customer_game" element={<CustomerGame />} />
        <Route path="/manage_games" element={<ManageGames />} />
        <Route path="/banned" element={<Banned />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
