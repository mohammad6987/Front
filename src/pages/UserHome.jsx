import React, { useState, useEffect } from "react";
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpireToken from "./ExpireToken";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserHome = () => {

  const [error, setError] = useState(null);
  const [tokenList, setTokenList] = useState([]);
  const [TokenName, setTokenName] = useState('');
  const [ExpireDate, setExpireDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  useEffect(() => {

    const fetchTokens = async () => {
      const isAuthorized = localStorage.getItem('user');

      if (isAuthorized !== 'true' || !token) {
        navigate('/login');
      } else {
        try {
          const response = await fetch('http://localhost:8080/user/api-tokens', {
            method: 'GET',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            }
          });
  
          if (response.ok) {
            const data = await response.json();
            setTokenList(data);
            // console.log(data);
          } else {
            setError(`Failed to fetch tokens:`);
          }
        } catch (error) {
          setError(`Connection Error : ${error.message}`);
          // console.log(error);
        }
      }
    };

    fetchTokens();
  }, [navigate]);

  const NewToken = async (event) => {
    event.preventDefault();
    console.log(ExpireDate);
    console.log(TokenName);
    console.log(token);

    try {
      
      const body = {
        name: TokenName,
        date: ExpireDate
      };

      const response = await fetch("http://localhost:8080/user/api-tokens", {
        method: 'POST',
        headers: {
          'Authorization': token
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const responseText = await response.text();
        console.log(responseText);
      } else {
        setError('error in sending data');
      }
    } catch {
      setError("Connection Error. ");
    }
  }

  const TokenNameHandler = (event) => {
    setTokenName(event.target.value);
  }

  const DateHandler = (event) => {
    setExpireDate(event.target.value);
  }

  if (error) {
    return <div className="wrapper">{error}</div>;
  }

  if (!tokenList) {
    return <div className="wrapper">Loading...</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tokenList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="wrapper1">
      <div className="content-container">
        <div className="form-container">
          <form onSubmit={NewToken}>
            <h1>New Token</h1>

            <div className='input-box'>
              <label>Token name</label>
              <input type='text' placeholder='Token Name' value={TokenName} onChange={TokenNameHandler} />
              <FaUser className='icon' />
            </div>

            <div className='input-box'>
              <label> Expire Date </label>
              <input type='text' placeholder='Expire Date' value={ExpireDate} onChange={DateHandler} />
              <FaLock className='icon' />
            </div>

            <div>
              <button style={{ marginTop: 30 }} type='submit'>Create Token</button>
            </div>
          </form>
        </div>
        
        <div className="table-container">
          <table className="table table-striped-columns">
            <thead>
              <tr>
                <th>Token Name</th>
                <th>Expiration Time</th>
                <th>Expire Button</th>
                
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, index) => 
                <ExpireToken
                  key={index}
                  name={item.name} 
                  expireDate={item.expireDate} 
                  Maintoken={item.tokenValue}
                />
              )}
            </tbody>
          </table>
          
          <Pagination 
            itemsPerPage={itemsPerPage} 
            totalItems={tokenList.length} 
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
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

export default UserHome;