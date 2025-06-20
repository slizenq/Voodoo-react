import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./index.css";

const Aside = ({ isCollapsed, toggleSidebar, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const menuItems = [
    { path: "/admin/users", icon: "👥", text: "Пользователи" },
    { path: "/admin/product", icon: "📦", text: "Товары" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h3>Админ-панель</h3>}
        <button onClick={toggleSidebar} className="toggle-btn">
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                <span className="icon">{item.icon}</span>
                {!isCollapsed && <span className="text">{item.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer" ref={profileRef}>
        <div className="profile-container">
          {user ? (
            <>
              <div
                className="profile-icon"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <span className="user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </span>
                {!isCollapsed && (
                  <span className="user-name">{user.username}</span>
                )}
              </div>
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <p className="profile-name">{user.username}</p>
                    <p className="profile-email">{user.email}</p>
                    {user.isAdmin && (
                      <p className="profile-role">Администратор</p>
                    )}
                  </div>
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    На главную
                  </Link>
                  <button
                    className="dropdown-item logout-btn"
                    onClick={handleLogout}
                  >
                    Выйти
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/auth" className="login-btn">
              Войти
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
