import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Subscription from "./pages/Subscription";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Navigation from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import "./App.css"; 

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // ✅ Properly initialize AOS inside useEffect
  }, []);

  return (
    <Router>
      <div className="container-fluid p-0">
        {/* 🌟 Animated Navbar */}
        <Navigation />
        {/* <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
          <div className="container">
            <Link className="navbar-brand" to="/">
              🍽️ Rasoi Bite
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link" to="/menu">Menu</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/order">Order</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/subscription">Subscription</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/reviews">Reviews</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              </ul>
            </div>
          </div>
          </nav> */}

        {/* 🌟 Page Content */}
        <div className="content-container">
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* 🌟 Footer Section */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// import Home from "./pages/Home";
// import Menu from "./pages/Menu";
// import Order from "./pages/Order";
// import Subscription from "./pages/Subscription";
// import Reviews from "./pages/Reviews";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import Signup from "./pages/Signup";
// import Footer from "./components/Footer";
// import Navigation from "./components/Navbar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import 'animate.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import "./App.css";

// function App() {
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   return (
//     <Router>
//       <MainContent />
//     </Router>
//   );
// }

// function MainContent() {
//   const location = useLocation();
//   const showHero = location.pathname === "/"; // ✅ Show hero ONLY on Home page

//   return (
//     <div className="container-fluid p-0">
//       <Navigation />
//       {showHero && <div className="hero-section"> {/* ✅ Show hero only on Home */}
//         <h1>Welcome to Rasoi Bite</h1>
//       </div>}
//       <div className="content-container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/menu" element={<Menu />} />
//           <Route path="/order" element={<Order />} />
//           <Route path="/subscription" element={<Subscription />} />
//           <Route path="/reviews" element={<Reviews />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default App;
