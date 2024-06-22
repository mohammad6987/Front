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

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  }

  const passwordHandler = (event) => {
    setpassword(event.target.value);
    if (event.target.value.length < 5) {
      seterror("password must be at least 5 characters");
    } else {
      seterror(null);
    }
  }

  const submitHandler = () => {
    if (password.length >= 5) {
      // alert("username :" + username);
      // alert("password :" + password);
      navigate('/')
    } else {
      seterror("password must be at least 5 characters")
    }
  }

  return(
    <div className='wrapper'>
      <form onSubmit={submitHandler}>
        {/* <img style={ { marginTop: 10} } src='images.png'></img> */}
        <h1 >
            LOGIN
        </h1 >

        <div className='input-box'>
          <label> Username </label>
          <input type='text' placeholder='USERNAME' value={username} onChange={usernameHandler}></input>
          <FaUser className='icon' />
        </div>
        {/* <p>username is : {username}</p> */}

        <div className='input-box'>
          <label> PassWord </label>
          <input type='password' placeholder='PASSWORD' value={password} onChange={passwordHandler}></input>
          <FaLock className='icon' />
        </div>
        <div className='forget'>
          {error && <div style={{ color: 'red' }}> {error} </div>} 
        </div>
        {/* <p>password is : {password}</p>  */}

        
        <div>
          <button style={ { marginTop: 30} } type='submit'> SUBMIT </button>
        </div>
      </form>

      <button style={ { marginTop: 10} }>
        <NavLink to="https://www.zoomit.ir/"> Sign Up </NavLink>  
      </button>
    </div>
  )
}


export default login;