import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';
import HamburgerMenu from './components/Hamburgers/HamburgerMenu';
import Login from './components/LoginSignup/Login';
import SignUp from './components/LoginSignup/SignUp';
import { Roles } from './constants/Roles';
import { HOME_BY_ROLE } from './constants/HomeByRole';
import CustomerHome from './pages/customer/CustomerHome';
//---------------------------------------------------------------------------------------------
import ProfilePage from './components/customer/ProfilePage/ProfilePage';
import MyOrders from './components/customer/MyOrders/MyOrders';
import NearShopSearchPage from './components/customer/NearByShopSearchPage/NearShopSearchPage';
import NotificationsPage from './components/customer/NotificationsPage/NotificationsPage';
import VisitedShops from './components/customer/VisitedShops/VisitedShops';
import MyCart from './components/customer/MyCart/MyCart';
// TEMP: only for testing;

//customer context provider
import { CustomerProvider } from './components/customer/CustomerContext/CustomerContext';


function App() {
  const userRole = localStorage.getItem('role');
  console.log(userRole);

  return (
    <Router>
              <CustomerProvider>
      <Routes>

        {/* Protected route */}
        <Route path="/customer/home" element={
          <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
            <HamburgerMenu></HamburgerMenu>
            <NearShopSearchPage></NearShopSearchPage>
          </ProtectedRoute>
        }
        />

          <Route path="/customer/nearby-shops" element={
            <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
              {/* <CustomerProvider> */}
              <CustomerHome></CustomerHome>

            </ProtectedRoute>
          }
          />


        <Route path="/customer/profile" element={
          <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
            <HamburgerMenu></HamburgerMenu>
            <ProfilePage></ProfilePage>
          </ProtectedRoute>
        }
        />
        <Route path="/customer/orders" element={
          <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
            <HamburgerMenu></HamburgerMenu>
            <MyOrders></MyOrders>
          </ProtectedRoute>
        }
        />
        <Route path="/customer/notifications" element={
          <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
            <HamburgerMenu></HamburgerMenu>
            <NotificationsPage></NotificationsPage>
          </ProtectedRoute>
        }
        />

        <Route path="/customer/visited-shops" element={
          <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
            <HamburgerMenu></HamburgerMenu>
            <VisitedShops></VisitedShops>
          </ProtectedRoute>
        }
        />
        <Route path="/customer/cart" element={
          <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
            <HamburgerMenu></HamburgerMenu>
            <MyCart></MyCart>
          </ProtectedRoute>
        }
        />
        <Route path="/shopkeeper/home" element={
          <ProtectedRoute allowedRoles={[Roles.CUSTOMER]}>
            <HamburgerMenu></HamburgerMenu>
          </ProtectedRoute>
        }
        />
        <Route path="/profile-management" element={
          <ProtectedRoute allowedRoles={[userRole]}>
            <HamburgerMenu></HamburgerMenu>
          </ProtectedRoute>
        }
        />
        <Route path="/notifications" element={
          <ProtectedRoute allowedRoles={[userRole]}>
          </ProtectedRoute>
        }
        />

        {/* Public route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />


      </Routes>
      </CustomerProvider>
    </Router>
  );
}

export default App;
