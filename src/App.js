import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Routes, Route } from "react-router-dom";
import "./style.css";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import Auth from "./components/ui/Auth";
import axios from "axios";
import AdminRoutes from "./page/AdminPanel/AdminRoutes";
import Basket from "./page/Basket";
import Main from "./page/Main";
import Product from "./page/Product";
import CategoryProductsPage from "./page/CategoryProductsPage";

const AppRouter = ({
  isAdmin,
  user,
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
}) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {isAdminRoute ? (
        <div className="admin-layout">
          <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </div>
      ) : (
        <>
          <Header
            user={user}
            cart={cart}
            onLogout={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          />
          <Routes>
            <Route path="/" element={<Main addToCart={addToCart} />} />
            <Route
              path="/basket"
              element={
                <Basket
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              }
            />
            <Route
              path="/product/:id"
              element={<Product addToCart={addToCart} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route
              path="/categories/:category/products"
              element={<CategoryProductsPage addToCart={addToCart} />}
            />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        const newCount = existingItem.count + 1;
        if (product.stock && newCount > product.stock) {
          alert(`Максимальное количество товара: ${product.stock}`);
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, count: newCount } : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            count: 1,
            selected: false,
          },
        ];
      }
    });
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/check`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        setUser(response.data.user);
        setIsAdmin(response.data.user.isAdmin || false);
      } catch (e) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, [location]);
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newCount, updatedProduct = null) => {
    if (newCount < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? updatedProduct || { ...item, count: newCount }
          : item
      )
    );
  };
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setIsAdmin(userData.isAdmin || false);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <AppRouter
          isAdmin={isAdmin}
          user={user}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
