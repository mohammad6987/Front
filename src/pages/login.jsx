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
      seterror("password must be at least 2 characters");
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
          throw new Error('Network response was not ok');
        }

        const data = await response.text();

        const tokenMatch = data.match(/token value = (API \S+)/);
        if (tokenMatch) {
          const extractedToken = tokenMatch[1];
          setToken(extractedToken);
          console.log(extractedToken);

          localStorage.setItem('token', extractedToken);

          navigate('/');
        } else {
          setError('Token not found in response');
          console.log("error number 2")
        }
      } catch (error) {
        console.log('There was a problem with the fetch operation:', error);
        setError('Login failed. Please try again.');
      }
    } else {
      setError("Password must be at least 2 characters");
      console.log("error");
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

        <div className='forget'>
          {error && <div style={{ color: 'red', fontFamily: 'sans-serif' }}> {error} </div>} 
        </div>
        
        <div>
          <button style={ { marginTop: 30} } type='submit'> SUBMIT </button>
        </div>
      </form>

      <button style={ { marginTop: 10} }>
        <NavLink to="https://www.zoomit.ir/"> Sign Up </NavLink>  
      </button>
    
    </div>
  );
}


export default login;