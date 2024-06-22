import React, { useState, useEffect } from 'react'
import '../App.css'

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
    <ul>
      {users.map( item => (
        <li>{item.username}</li>
      ))}
    </ul>
  );
}

export default Home;
