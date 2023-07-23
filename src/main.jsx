import React from "react";

import configRoles from '../configRoles';

import ReactDOM from "react-dom/client";

import "./index.css";

import Login from "./components/Auth/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import Home from "./components/Home";
import RequestPrivate from "./components/RequestPrivate";
import Unauthorized from "./components/Unauthorized";
import Root from "./components/Root";
import PersistLogin from "./components/PersistLogin";
import Missing from "./components/Missing";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children : [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Unauthorized></Unauthorized>,
      },
      {
        path: "unauthorized",
        element: <Unauthorized></Unauthorized>,
      },
      
      
      {
        path:'/',
        element: <PersistLogin/>,
        children : [
          {
            path: '/',
          element:  <RequestPrivate  roles={[configRoles.USER, configRoles.ADMIN]}> <Home/> </RequestPrivate> }
        ]
      },

      
    ],
   
  },
  {
    path: "/*",
    element : <Missing/>

  }
  
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
