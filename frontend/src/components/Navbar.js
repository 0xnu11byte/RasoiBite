// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link } from "react-router-dom";

// <Link to="/menu" className="nav-link">Menu</Link>

// const Navigation = () => {
//   return (
//     <Navbar expand="lg" className="navbar-dark">
//       <Container>
//         <Navbar.Brand href="/">🍽️ Rasoi Bite</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/menu">Menu</Nav.Link>
//             <Nav.Link href="/order">Order</Nav.Link>
//             <Nav.Link href="/login">Login</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigation;

// import React, { useEffect, useState } from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link } from "react-router-dom";

// const Navigation = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (userData) setUser(userData);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     window.location.href = "/login";
//   };

//   return (
//     <Navbar expand="lg" className="navbar-dark custom-navbar fixed-top">
//       <Container>
//         <Navbar.Brand as={Link} to="/">🍽️ Rasoi Bite</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link as={Link} to="/">Home</Nav.Link>
//             <Nav.Link as={Link} to="/menu" style={{ color: "black" }}> Menu </Nav.Link>
//             <Nav.Link as={Link} to="/order">Order</Nav.Link>
            // <Nav.Link as={Link} to="/subscription">Subscription</Nav.Link>
            // <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link>
            // <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            
//             {user ? (
//               <>
//                 <Nav.Link as={Link} to="/profile">
//                   <img 
//                     src={user.profileImage || "http://localhost:5000/uploads/default-profile.png"} 
//                     alt="Profile" 
//                     width="40" 
//                     height="40" 
//                     style={{ 
//                       borderRadius: "50%", 
//                       cursor: "pointer", 
//                       objectFit: "cover",
//                       border: "2px solid white"
//                     }} 
//                   />
//                 </Nav.Link>
//                 <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//               </>
//             ) : (
//               <Nav.Link as={Link} to="/login">Login</Nav.Link>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigation;

import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const closeMenu = () => setExpanded(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <Navbar expand="lg" className="navbar-dark bg-dark fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">🍽️ Rasoi Bite</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={closeMenu}>Home</Nav.Link>
            <Nav.Link as={Link} to="/menu" onClick={closeMenu}>Menu</Nav.Link>
            <Nav.Link as={Link} to="/subscription" onClick={closeMenu}>Subscription</Nav.Link>
            <Nav.Link as={Link} to="/reviews" onClick={closeMenu}>Reviews</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={closeMenu}>Contact</Nav.Link>

            {user ? (
              <NavDropdown
                title={
                  <img
                    //src={user.profileImage ? user.profileImage : `${API_BASE_URL}/uploads/doremon.jpg`}
                    src={user.profileImage || `${API_BASE_URL}/uploads/doremon.jpg`}
                    alt="Profile"
                    width="40"
                    height="40"
                    style={{
                      borderRadius: "50%",
                      cursor: "pointer",
                      objectFit: "cover",
                      border: "2px solid white",
                    }}
                  />
                }
                id="profile-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/order">Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
