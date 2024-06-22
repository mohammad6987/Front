import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const login = () => {

  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState(null);

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
      alert("username :" + username);
      // alert("password :" + password);
    } else {
      seterror("password must be at least 5 characters")
    }
  }

  return(
    <>
      <form onSubmit={submitHandler}>
        <img style={ { marginTop: 10} } src='images.png'></img>
        <p >
            LOGIN
        </p >

        <div>
          <label> Username </label>
          <input type='text' value={username} onChange={usernameHandler}></input>
        </div>
        {/* <p>username is : {username}</p> */}

        <div style={ { marginTop: 10} }>
          <label> PassWord </label>
          <input type='password' value={password} onChange={passwordHandler}></input>
        </div>
        <div>
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
    </>
  )
}


export default login;