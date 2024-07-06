import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './login.css';

const SignUp = () => {

  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [data, setData] = useState(null);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  }

  const accountHandler = () => {
    navigate('/login');
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
        const url = "http://localhost:8080/users/register";
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
          seterror('Connection Error. ');
        } else {
          const data = await response.text();  
          setData("SignUp Successful. Wait for authentication. ");
          seterror(null);
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
            Sign Up
        </h1 >
        <div className='error-message'>
          {data}
        </div>

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
      
      
      <button onClick={accountHandler} style={ { marginTop: 10} }>
        Already have an account?
      </button>
    
    </div>
  );
}


export default SignUp;