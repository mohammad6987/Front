import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './login.css';

const Login = () => {
  localStorage.clear();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  }

  const accountHandler = () => {
    navigate('/SignUp');
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 2) {
      setError("Password must be at least 2 characters");
    } else {
      setError(null);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password.length >= 2) {
      try {
        const url = "http://localhost:8080/users/login";
        const body = {
          username: username,
          password: password
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          setError('User Not Found. ');
        } else {
          const data = await response.text();
          if (data) {
            setError(null);
            if (username === 'admin') {
              localStorage.setItem('adminToken', data);
              localStorage.setItem('admin', 'true');
              navigate('/Adminhome');
            } else {
              localStorage.setItem('userToken', data);
              localStorage.setItem('user', 'true');
              navigate('/userhome');
            }
          } else {
            setError('Token not found in response');
          }
        }
 
      } catch (error) {
        setError('There was a problem with the fetch operation.');
      }
    } else {
      setError("Password must be at least 2 characters");
    }
  }

  return(
    <div className='wrapper'>
      <form onSubmit={submitHandler}>
        <h1>LOGIN</h1>

        <div className='input-box'>
          <label>Username</label>
          <input type='text' placeholder='USERNAME' value={username} onChange={usernameHandler} />
          <FaUser className='icon' />
        </div>

        <div className='input-box'>
          <label>Password</label>
          <input type='password' placeholder='PASSWORD' value={password} onChange={passwordHandler} />
          <FaLock className='icon' />
        </div>

        {error && (
          <div className='error-message' style={{ color: 'red', fontFamily: 'sans-serif', marginBottom: '10px' }}>
            {error}
          </div>
        )}
        
        <div>
          <button style={{ marginTop: 30 }} type='submit'>SUBMIT</button>
        </div>
      </form>
      
      <button onClick={accountHandler} style={{ marginTop: 10 }}>
        Don't have an account?
      </button>
    </div>
  );
}

export default Login;