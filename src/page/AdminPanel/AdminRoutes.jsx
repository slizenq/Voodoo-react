import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Aside from "./common/Aside/Aside";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import "./index.css";
import Users from "./pages/Users/Users";

function AdminRoutes() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="admin-container">
      <Aside isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className={`admin-content ${isCollapsed ? "collapsed" : ""}`}>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/product" element={<AdminProducts />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminRoutes;