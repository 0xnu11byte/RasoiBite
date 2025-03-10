import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup text-center">
      <style>
        {`
          .signup-container {
            display: flex;
            flex-direction: column;
            justify-content: center;  
            align-items: center;      
            height: 80vh;          
            background: linear-gradient(135deg, #ff9966, rgb(61, 16, 98));
            padding: 20px;
          }

          .signup-form {
            width: 350px;
            padding: 20px;
            border-radius: 10px;
            background: linear-gradient(45deg, rgb(217, 137, 156), rgb(54, 54, 255));
            color: white;
            position: relative;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
            text-align: left;
          }

          .signup-form::before {
            content: "";
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, rgb(226, 108, 135), rgb(210, 32, 53));
            border-radius: 12px;
            z-index: -1;
          }

          .signup-title {
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 8px;
            color: white;
            font-size: 1.8rem;
            text-align: left;
            width: 100%;
          }

          .form-group {
            text-align: left;
          }

          .signup-btn {
            width: 100%;
          }

          /* Eye Icon Styling */
          .password-toggle {
            cursor: pointer;
            color: black;
            margin-right: 10px;
          }

          @media (max-width: 480px) {
            .signup-form {
              padding: 15px;
              width: 90%;
            }
          }
        `}
      </style>

      <div className="signup-container">
        <Form className="signup-form">
          <h1 className="signup-title">Sign Up</h1>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputGroup.Text
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Button variant="success" className="signup-btn">Signup</Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
