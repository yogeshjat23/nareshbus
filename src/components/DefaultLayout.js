import React from 'react';
import '../resources/layout.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'remixicon/fonts/remixicon.css';

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);

  // Correctly reference `state.users`
  const { user } = useSelector((state) => state.users || { user: null });

  const userMenu = [
    { name: 'Home', icons: 'ri-home-line', path: '/' },
    { name: 'Bookings', icons: 'ri-file-list-line', path: '/bookings' },
    { name: 'Profile', icons: 'ri-user-line', path: '/profile' },
    { name: 'Logout', icons: 'ri-logout-box-line', path: '/logout' },
  ];

  const adminMenu = [
    { name: 'Home', path: '/', icons: 'ri-home-line' },
    { name: 'Buses', path: '/admin/buses', icons: 'ri-bus-line' },
    { name: 'Users', path: '/admin/Users', icons: 'ri-user-line' },
    { name: 'Bookings', path: '/bookings', icons: 'ri-file-list-line' },
    { name: 'Logout', path: '/logout', icons: 'ri-logout-box-line' },
  ];

  // Ensure `menuToBeRendered` is an array
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu || [];
  let activeRoute = window.location.pathname;
  if(window.location.pathname.includes('book-now')){
    activeRoute = "/";
  }
  return(
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header"
        >
          <h1 className="logo">SB</h1>
          <h1 className="role">
            {user?.name} <br />
            Role : {user?.isAdmin ? 'Admin' : 'User'}
          </h1>
        </div>
        <div className="d-flex flex-column gap-3 justify-content-start menu">
          {menuToBeRendered.map((item, index) => (
            <div
              key={index} // React requires a unique key for each item
              className={`${
                activeRoute === item.path ? 'active-menu-item' : ''
              } menu-items`}
            >
              <i className={item.icons}></i>
              {!collapsed && (
                <span
                  onClick={() => {
                    if (item.path === '/logout') {
                      localStorage.removeItem('token');
                      navigate('/login'); // Redirects to login after logout
                    } else {
                      navigate(item.path); // Navigates to the selected path
                    }
                  }}
                >
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="body"
      >
        <div className="header">
          {collapsed ? (
            <i
              className="ri-menu-2-fill"
              onClick={() => setCollapsed(!collapsed)} // Toggles collapse state
            ></i>
          ) : (
            <i
              className="ri-close-line"
              onClick={() => setCollapsed(!collapsed)} // Toggles collapse state
            ></i>
          )}
          <h5 
    className="welcome" 
    style={{
        backgroundColor: "black",
        color: "white",
    }}
   >
    Welcome in SheyBus
    </h5>

        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
