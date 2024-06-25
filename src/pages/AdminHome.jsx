import React, { useState, useEffect } from 'react';
import './home.css';
import DataTableRow from './DataTableRow';

const AdminHome = () => {

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

  if (!data) {
    return <div className="wrapper">Loading...</div>;
  }

  return(
      
    <table align='center' border='1' className='wrapper'>
      <tr>
        <th>
          id
        </th>

        <th>
          username
        </th>

        <th>
          SignDate
        </th>

        <th>
          Status
        </th>
      </tr>

        {data.map(item => <DataTableRow id={item.id} username={item.username} SignDate={item.registerDate} button={item.authorized}></DataTableRow>)}

    </table>
  );


}

export default AdminHome;