import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import './resources/global.css'
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this is imported
import PublicRoute from './components/PublicRoute'; // Ensure this is imported
import Loader from './components/Loader';
import {useSelector} from 'react-redux';
import Profile from './pages/Admin/Profile';
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';
import BookNow from './pages/BookNow'; 
import Bookings from "./pages/Bookings";
function App() {
  const {loading} = useSelector(state => state.alerts);
  return (
    <div>
      { loading && <Loader/> }
      <HashRouter>
        <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
           {/* <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} /> */}
          <Route path="/book-now/:id" element={<ProtectedRoute><BookNow /></ProtectedRoute>}/>
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin/buses" element={<ProtectedRoute><AdminBuses /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
