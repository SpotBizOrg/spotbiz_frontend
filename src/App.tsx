import { Routes, Route } from "react-router-dom";
import Home from "./pages/LandingPage";
import Login from "./pages/Login";
import Registration from "./components/Regitration";
import SignupFormBusiness from "./pages/SignupFormBusiness";
import SignupFormCustomer from "./pages/SignUpForm";
import SignupInProgress from "./pages/SignupInProgress";
import VerificationInProgress from "./pages/VerificationInProgress";
import Banned from "./components/Banned";
import CustomerHome from "./pages/CustomerHome";
import Guided2 from "./pages/Guided2";
import Guided3 from "./pages/Guided3";
import AdminVerify from "./pages/BusinessVerify";
import AdminTagsReviews from "./pages/AdminTags&Reviews";
import BusinessReviews from "./pages/BusinessReviews";
import CustomerReview from "./pages/CustomerReviews";
import Badges from "./pages/Badges";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPackages from "./pages/AdminPackages";
import Chart from "./components/PerformanceChart";
import SearchResults from "./pages/SearchResults";
import BusinessDashboard from "./pages/BusinessDashboard";
import CustomerGame from "./pages/CustomerGame";
import AllRecommendations from "./pages/AllRecommendations";
import ManageGames from "./pages/ManageGames";
import GamePage from "./pages/GamePage";
import CustomerProfile from "./pages/CustomerProfile2";
import BusinessProfile from "./pages/BusinessProfile2";
import ManageCoupons from "./pages/ManageCoupons";
import Reports from "./pages/Reports&Appeals";
import AdvertisementsPage from "./components/BusinessAd";
import BusinessList from "./pages/BusinessList";
import AdminPage from "./pages/AdminPage";
import BusinessPage from "./pages/BusinessPage";
import PackageListPage from "./pages/PackageListPage";
import "./App.css";
import { useEffect } from "react";
import { messaging } from "./firebase/firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
import Message from "./components/Message";
import "react-toastify/dist/ReactToastify.css";
import { setNotificationCount } from "../config";
import OnboardingForm from "./pages/OnboardingForm";
import PackageListPageNew from "./pages/PackageListPageNew";
import PaymentGateway from "./pages/PaymentGateway";
import OopsPage from "./pages/OopsPage";
import AdminCuponReimburse from "./pages/AdminCuponReimburse";
import BusinessCupon from "./pages/BusinessCoupon";
import AdminTransactions from "./pages/AdminTransactions";

function App() {
  const saveNotificationToDatabase = async (notification: {
    title: string;
    body: string;
    image?: string;
  }) => {
    try {
      console.log("Notification saved successfully." + notification.body);
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  };

  onMessage(messaging, (payload) => {
    const {
      title = "Default Title",
      body = "Default Body",
      image,
    } = payload.notification || {};

    if (title && body) {
      setNotificationCount();
      const notificationData = { title, body, image };
      toast(<Message notification={notificationData} />);
      saveNotificationToDatabase(notificationData);
    } else {
      console.error("Notification payload is missing required fields.");
    }
  });

  async function requestPermission() {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
      });

      localStorage.setItem("fcmToken", token);
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<CustomerHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/guided" element={<Guided2 />} />
      <Route path="/guided3" element={<Guided3 />} />
      <Route path="/admin/business_verify" element={<AdminVerify />} />
      <Route path="/business/signup" element={<SignupFormBusiness />} />
      <Route path="/customer/signup" element={<SignupFormCustomer />} />
      <Route
        path="/business/verification-in-progress"
        element={<SignupInProgress />}
      />
      <Route
        path="/customer/not_verified"
        element={<VerificationInProgress />}
      />
      <Route path="/chart" element={<Chart />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/categories_tags" element={<AdminTagsReviews />} />
      <Route path="/customer/reviews" element={<CustomerReview />} />
      <Route path="/business/reviews" element={<BusinessReviews />} />
      <Route path="/admin/badges" element={<Badges />} />
      <Route path="/business/advertisements" element={<AdvertisementsPage />} />
      <Route path="/customer/business_page" element={<BusinessPage />} />
      <Route path="/admin/customers" element={<AdminPage />} />
      <Route path="/admin/businesses" element={<BusinessList />} />
      <Route path="/business/profile" element={<BusinessProfile />} />{" "}
      <Route path="/customer/profile" element={<CustomerProfile />} />
      <Route path="/customer/search_results" element={<SearchResults />} />
      <Route path="/admin/coupons" element={<ManageCoupons />} />
      <Route path="/admin/packages" element={<AdminPackages />} />
      <Route path="/business/dashboard" element={<BusinessDashboard />} />
      <Route path="/customer/games" element={<CustomerGame />} />
      <Route path="/admin/games" element={<ManageGames />} />
      <Route path="/customer/play_game" element={<GamePage />} />
      <Route path="/business/banned" element={<Banned />} />
      <Route path="/admin/appeals_reports" element={<Reports />} />
      <Route path="/packages" element={<PackageListPage />} />
      <Route path="/allrecommendations" element={<AllRecommendations />} />
      {/* <Route path="/packages2" element={<PackageListPageNew />} /> */}
      <Route path="/onboard" element={<OnboardingForm />} />
      <Route path="/packages/payment" element={<PaymentGateway />} />
      <Route path="/error" element={<OopsPage />} />
      <Route path="/admin/reimburse" element={<AdminCuponReimburse />} />
      <Route path="/business/reimburse" element={<BusinessCupon />} />
      <Route path="/admin/transactions" element={<AdminTransactions />} />


    </Routes>
  );
}

export default App;
