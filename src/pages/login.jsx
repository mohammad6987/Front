import { useState, useEffect } from 'react';

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
      alert("password :" + password);
    } else {
      seterror("password must be at least 5 characters")
    }
  }

  return(
    <form onSubmit={submitHandler}>
      <img src='images.png'></img>
      <p >
           LOGIN
      </p >

      <label> Username </label>
      <input type='text' value={username} onChange={usernameHandler}></input>
      <p>username is : {username}</p>

      <label> PassWord </label>
      <input type='password' value={password} onChange={passwordHandler}></input>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <p>password is : {password}</p> 

      
      <button type='submit'> SUBMIT </button>
    </form>
  )
}


export default login;