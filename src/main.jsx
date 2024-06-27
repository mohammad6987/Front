import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Authorize from './pages/AdminHome.jsx'
import Login from './pages/login.jsx'
import SignUp from './pages/signup.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserHome from './pages/UserHome.jsx'
import Main from './pages/Main.jsx'


const router = createBrowserRouter(
  [
    {path : '/Adminhome', element :  <Authorize/> },
    {path : '/login', element :  <Login/> },
    {path : '/userhome', element : <UserHome/> },
    {path : '/signUp', element : <SignUp/> },
    {path : '/' , element : <Main/> }
  ]
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <App />
  </React.StrictMode>,
)
