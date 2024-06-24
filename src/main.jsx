import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import User from './pages/User.jsx'
import SignUp from './pages/signup.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter(
  [
    {path : '/home', element :  <Home/> },
    {path : '/login', element :  <Login/> },
    {path : '/user', element : <User/> },
    {path : '/signUp', element : <SignUp/> },
    
  ]
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <App />
  </React.StrictMode>,
)
