import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import api from "./api";

import Home from "./Pages/Home/Home";
import PublicLayout from "./Layouts/PublicLayout";
import DataConsumerPolicy from "./Pages/DataConsumerPolicy/DataConsumerPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions/TermsAndConditions";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Order from "./Pages/Order/Order";
import AdminLayout from "./Layouts/AdminLayout";

import Login from "./Pages/Admin/Login/Login";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import OrderAdmin from "./Pages/Admin/Order/OrderAdmin";
import ManageCategory from "./Pages/Admin/ManageCategory/ManageCategory";
import ManageProduct from "./Pages/Admin/ManageProduct/ManageProduct";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const checkAuth = async () => {
    try {
      const res = await api.get("Auth/check");
      if (res.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message);
        setIsAuthenticated(false);
      } else {
        console.error("CheckAuth error", err);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="data-consumer-policy" element={<DataConsumerPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="about" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="order" element={<Order />} />
        </Route>
        <Route>
          {isAuthenticated ? (
            <Route path="/" element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/order-history" element={<OrderAdmin />} />
              <Route path="/admin/manage-category" element={<ManageCategory />} />
              <Route path="/admin/manage-product" element={<ManageProduct />} />
            </Route>
          ) : (
            <Route path="/" element={<PublicLayout />}>
              <Route path="/admin" element={<Login />} />
            </Route>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
