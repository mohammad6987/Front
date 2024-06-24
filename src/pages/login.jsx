import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './login.css';

const login = () => {

  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  }

  const passwordHandler = (event) => {
    setpassword(event.target.value);
    if (event.target.value.length < 2) {
      seterror("Password must be at least 2 characters");
    } else {
      seterror(null);
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
          seterror('User Not Found. ');
        } else {
          const data = await response.text();
          if (data) {
            setToken(data);
            console.log(data);

            localStorage.setItem('token', data);
            seterror(null);
            
            if (username == 'admin') {
              navigate('/home');
            } else {
              navigate('/user')
            }
          } else {
            seterror('Token not found in response');
          }
        }

        
      } catch (error) {
        seterror('There was a problem with the fetch operation.');
      }
    } else {
      seterror("Password must be at least 2 characters");
    }
  }

  return(
    <div className='wrapper'>
      <form onSubmit={submitHandler}>
        <h1 >
            LOGIN
        </h1 >

        <div className='input-box'>
          <label> Username </label>
          <input type='text' placeholder='USERNAME' value={username} onChange={usernameHandler}></input>
          <FaUser className='icon' />
        </div>

        <div className='input-box'>
          <label> PassWord </label>
          <input type='password' placeholder='PASSWORD' value={password} onChange={passwordHandler}></input>
          <FaLock className='icon' />
        </div>

        {error && (
          <div className='error-message' style={{ color: 'red', fontFamily: 'sans-serif', marginBottom: '10px' }}>
            {error}
          </div>
        )}
        
        <div>
          <button style={ { marginTop: 30} } type='submit'> SUBMIT </button>
        </div>
      </form>
      
      
      <button style={ { marginTop: 10} }>
        <NavLink to="/SignUp"> Don't have an account? </NavLink>  
      </button>
    
    </div>
  );
}


export default login;