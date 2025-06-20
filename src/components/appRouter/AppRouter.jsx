import { Navigate, Route, Routes } from "react-router-dom";
import Basket from "./../../page/Basket";
import Goods from "./../../page/Goods";
import Main from "./../../page/Main";
import Product from "./../../page/Product";
import AdminRoutes from "./../../page/AdminPanel/AdminRoutes";

const AppRouter = ({ isAdmin }) => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/goods/:category" element={<Goods />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/product/:id" element={<Product />} />
      <Route
        path="/admin/*"
        element={isAdmin ? <AdminRoutes /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
