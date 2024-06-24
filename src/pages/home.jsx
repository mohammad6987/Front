import React, { useState, useEffect } from 'react';
import './home.css';

const Home = () => {

  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/getAllUsers', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        });

        if (response.ok) {

          const data = await response.json();
          setData(data);
          console.log(data);

        } else {

          setError(`Failed to fetch users:`);

        }
      } catch (error) {

        setError(`Error fetching users: ${error.message}`);
        console.log(error);

      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className="wrapper">
        {error}
      </div>
    );
  }

  return (
    <div className="wrapper">
      {/* <ol>
        {data.map((user, index) => (
          <li key={index}>
            <strong>Username:</strong> {user.username}, 
            <strong> Auth:</strong> {user.auth ? 'true' : 'false'}, 
            <strong> Register Date:</strong> {user.registerDate}
          </li>
        ))}
      </ol> */}
      {data}
    </div>
  );
}

export default Home;
