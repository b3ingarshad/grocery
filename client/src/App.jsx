import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import UserDashboard from './UserDashboard';
import VendorDashboard from './VendorDashboard';
import AdminDashboard from './AdminDashboard';
import Product from './pages/User Pages/Products';
import Categories from './pages/User Pages/Categories';
import OrderStatus from './pages/User Pages/OrderStatus';
import UserProfile from './pages/User Pages/UserProfile.jsx';
import AddProductVendor from './pages/Vendor Pages/AddProduct';
import VendorProfile from './pages/Vendor Pages/VendorProfile';
import AddProduct from './pages/Admin Pages/AddProducts';
import UsersManagement from './pages/Admin Pages/UserManagementPage';
import VendorsManagement from './pages/Admin Pages/VendorManagementPage';
import OrderStatusManagementPage from './pages/Vendor Pages/OrderStatusManagementPage';
import CategoryManagementPage from './pages/Admin Pages/CategoryManagementPage';
import ReviewPage from './pages/User Pages/ReviewPage';
import CartPage from './pages/User Pages/Cart';
import CheckoutPage from './pages/User Pages/Checkout';
import SearchForm from './components/Common Components/Header/SearchForm/index';
import BlogPage from './pages/User Pages/BlogPage';
import ManageBlogsPage from './pages/Admin Pages/Blogs';
import './App.css';
import RegisterPage from './RegisterPage';
import WishlistPage from './pages/User Pages/WishlistPage';
import CatewiseProducts from './components/Common Components/CatewiseProducts';
import OrderHistory from './pages/Admin Pages/OrderHistory';
import OrderHistorys from './pages/Admin Pages/OrderHistory';
import SellProducts from './pages/Admin Pages/SellProduct';
import Profiles from './pages/Admin Pages/Profile';
import 'antd/dist/reset.css'; // for Ant Design v5
const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  return (
    <Router>
      <div>
        {/* Search Bar (Visible on all pages except login) */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/user-home" element={<UserDashboard />} />
          <Route path="/vendor-home" element={<VendorDashboard />} />
          <Route path="/admin-home" element={<AdminDashboard />} />

          <Route path="/" element={<Categories />} />
          <Route path="/category/:categoryId" element={<CatewiseProducts />} />
          {/* User Pages */}
          <Route path="/user-home/product" element={<Product />} />
          <Route path="/user-home/categories" element={<Categories />} />
          <Route path="/user-home/order" element={<OrderStatus />} />
          <Route path="/user-home/Profile" element={<UserProfile />} />
          <Route path="/user-home/review" element={<ReviewPage />} />
          <Route path="/user-home/cart" element={<CartPage />} />
          <Route path="/user-home/wishlist" element={<WishlistPage />} />
          <Route path="/user-home/checkout" element={<CheckoutPage />} />
          <Route path="/user-home/blogs" element={<BlogPage />} />

          {/* Vendor Pages */}
          <Route
            path="/vendor-home/add-product"
            element={<AddProductVendor />}
          />
          <Route
            path="/vendor-home/vendor-profile"
            element={<VendorProfile />}
          />
          <Route
            path="/vendor-home/manage-order-status"
            element={<OrderStatusManagementPage />}
          />

          {/* Admin Pages */}
          <Route path="/admin-home/add-product" element={<AddProduct />} />
          <Route path="/admin-home/order-history" element={<OrderHistorys />} />
          <Route path="/admin-home/sell-Product" element={<SellProducts />} />
          <Route path="/admin-home/Profile" element={<Profiles />} />
          <Route
            path="/admin-home/user-management"
            element={<UsersManagement />}
          />
          <Route
            path="/admin-home/vendor-management"
            element={<VendorsManagement />}
          />
          <Route
            path="/admin-home/manage-categories"
            element={<CategoryManagementPage />}
          />
          <Route
            path="/admin-home/manage-blogs"
            element={<ManageBlogsPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
