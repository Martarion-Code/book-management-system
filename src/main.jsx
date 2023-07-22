import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'


import Login from './components/Auth/Login'

import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login></Login>,
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
