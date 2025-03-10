

// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem("user", JSON.stringify(data));
//         window.location.href = "/";
//       } else {
//         alert("Login failed: " + data.message);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };

//   return (
//     <div className="text-center">
      // <style>
      //   {`
      //     .login-form {
      //       width: 350px;
      //       padding: 20px;
      //       border-radius: 10px;
      //       background: linear-gradient(45deg,rgb(217, 137, 156),rgb(54, 54, 255));
      //       color: white;
      //       position: relative;
      //     }

      //     .login-form::before {
      //       content: "";
      //       position: absolute;
      //       top: -2px;
      //       left: -2px;
      //       right: -2px;
      //       bottom: -2px;
      //       background: linear-gradient(45deg,rgb(226, 108, 135),rgb(210, 32, 53));
      //       border-radius: 12px;
      //       z-index: -1;
      //     }

      //     .signup-text {
      //       margin-top: 10px;
      //       font-size: 14px;
      //       color: #ccc;
      //     }
      //   `}
      // </style>
//       <h1>Login</h1>
//       <Form className="login-form mx-auto" onSubmit={handleLogin}>
//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control 
//             type="email" 
//             placeholder="Enter email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control 
//             type="password" 
//             placeholder="Enter password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required
//           />
//         </Form.Group>
//         <Button variant="primary" className="w-100" type="submit">Login</Button>
//         <div className="mt-3">
//           <p className="signup-text">Don't have an account?</p>
//           <Link to="/signup">
//             <Button variant="secondary" className="w-100">Sign Up</Button>
//           </Link>
//         </div>
//       </Form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        const token = data.token; // Assuming the backend returns a `token` field
        // Store the token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", JSON.stringify(data.userId));

        window.location.href = "/";
  
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
  
  //     if (res.data.token) {
  //       localStorage.setItem("token", res.data.token);
  //       //localStorage.setItem("userId", res.data.user.id); // Ensure `res.data.user` exists
  //       if (res.data.user && res.data.user.id) {
  //         localStorage.setItem("userId", res.data.user.id); // Ensure `res.data.user` exists
  //       }
  //       navigate("/"); // Redirect after login
  //     }
  //   } catch (err) {
  //     console.error("Login failed:", err);
  //   }
  // };
  

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/";
      } else {
        alert("Google Sign-In failed: " + data.message);
      }
    } catch (error) {
      console.error("Error with Google Sign-In:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="text-center">
      <style>
        {`

          /* Centering the Login Form */
          .login-container {
            display: flex;
            justify-content: center;  /* Horizontally center */
            align-items: center;      /* Vertically center */
            height: 80vh;           /* Full viewport height */
            background: linear-gradient(135deg, #ff9966,rgb(61, 16, 98)); /* Gradient background */
            text-align: left;
          }
          .login-form {
            width: 400px;
            padding: 20px;
            border-radius: 10px;
            background: linear-gradient(45deg,rgb(217, 137, 156),rgb(54, 54, 255));
            color: white;
            position: relative;
          }

          .login-form::before {
            content: "";
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg,rgb(226, 108, 135),rgb(210, 32, 53));
            border-radius: 12px;
            z-index: -1;
          }

          .login-title {
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 8px;
            color: white;
            font-size: 1.8rem;
            text-align: left;
            width: 100%;
          }
          
          .signup-text {
            margin-top: 10px;
            font-size: 14px;
            color: #ccc;
            text-align: center;
          }

          @media (max-width: 480px) {
            .login-form {
              padding: 15px;
              width: 90%;
            }
          }
        `}
      </style>
        <div className="login-container">
         
          <Form className="login-form" onSubmit={handleLogin}>
          <h1 className="login-title">Login</h1>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" className="w-100" type="submit">
              Login
            </Button>
            <p className="signup-text">Don't have an account?</p>
            <Button variant="outline-light" className="w-100 mt-2" href="/signup">
              Signup
            </Button>
            <hr />
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert("Google Sign-In Failed")} />
          </Form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
