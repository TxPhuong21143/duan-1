import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from 'react-router-dom'
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";
import App from './component/App'
// import getAllProduct from "./api/ProductAPI.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>
);
// getAllProduct();
reportWebVitals();
