import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

import 'animate.css/animate.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
