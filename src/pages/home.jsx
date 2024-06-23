import React, { useState, useEffect } from 'react'
import './home.css'

const Home = () => {
 
  const [users, setUsers] = useState([{
    username: "test",
    sign_date: "",
    status: ""
  }]);

  // const baseUrl = "";
  // useEffect(() => {
  //   fetch(baseUrl)
  //     .then(response => response.json())
  //     // .then(data => setcontry([...countries, data]));
  // }, []);

  return (
    <table className='wrapper'>
      <ul>
        {users.map( item => (
          <li>{item.username}</li>
        ))}
      </ul>
    </table>
  );
}

export default Home;