import React, { useState, useEffect } from 'react';
import './home.css';
import DataTableRow from './DataTableRow';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminHome = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
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
    return <div className="wrapper">{error}</div>;
  }

  if (!data) {
    return <div className="wrapper">Loading...</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="wrapper">
      <table className='table table-striped-columns'>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>SignDate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => 
            <DataTableRow 
              key={item.id}
              id={item.id} 
              username={item.username} 
              SignDate={item.registerDate} 
              button={item.authorized}
            />
          )}
        </tbody>
      </table>
      <Pagination 
        itemsPerPage={itemsPerPage} 
        totalItems={data.length} 
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href='#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AdminHome;