import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import HamburgerMenu from './components/Hamburgers/HamburgerMenu';
import Login from './components/LoginSignup/Login';
import SignUp from './components/LoginSignup/SignUp';
import ProfileManagement from './components/ProfileManagement/ProfileManagement';
import Notifications from './components/Notifications/Notifications';
import { Roles } from './constants/Roles';
import { HOME_BY_ROLE } from './constants/HomeByRole';
import CustomerHome from './pages/customer/CustomerHome';
//---------------------------------------------------------------------------------------------
import ProfilePage from './components/customer/ProfilePage/ProfilePage';
import MyOrders from './components/customer/MyOrders/MyOrders';
import NearShopSearchPage from './components/customer/NearByShopSearchPage/NearShopSearchPage';
import NotificationsPage from './components/customer/NotificationsPage/NotificationsPage';
// TEMP: only for testing


function App() {
  const userRole = localStorage.getItem('role');
  console.log(userRole);

  return (
    <Router>
      <Routes>

        {/* Protected route */}
        <Route  path="/customer/home" element={
            <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
              <CustomerHome></CustomerHome>
            </ProtectedRoute>
          }
        />
        <Route  path="/customer/profile" element={
            <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
              <HamburgerMenu></HamburgerMenu>
              <ProfilePage></ProfilePage>
            </ProtectedRoute>
          }
        />
        <Route  path="/customer/orders" element={
            <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
              <HamburgerMenu></HamburgerMenu>
              <MyOrders></MyOrders>
            </ProtectedRoute>
          }
        />
        <Route  path="/customer/notifications" element={
            <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
              <HamburgerMenu></HamburgerMenu>
              <NotificationsPage></NotificationsPage>
            </ProtectedRoute>
          }
        />
        <Route  path="/customer/nearby-shops" element={
            <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
              <HamburgerMenu></HamburgerMenu>
              <NearShopSearchPage></NearShopSearchPage>
            </ProtectedRoute>
          }
        />
        <Route  path="/shopkeeper/home" element={
            <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
              <HamburgerMenu></HamburgerMenu>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route  path="/profile-management" element={
            <ProtectedRoute allowedRoles={[userRole]}>
              <HamburgerMenu></HamburgerMenu>
              <ProfileManagement />
            </ProtectedRoute>
          }
        />
        <Route  path="/notifications" element={
            <ProtectedRoute allowedRoles={[userRole]}>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* Public route */}
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>


      </Routes>
    </Router>
  );
}

export default App;
