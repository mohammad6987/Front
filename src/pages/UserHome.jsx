import React, { useState, useEffect } from "react";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpireToken from "./ExpireToken";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const [error, setError] = useState(null);
  const [tokenList, setTokenList] = useState(null);
  const [TokenName, setTokenName] = useState('');
  const [ExpireDate, setExpireDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    const fetchTokens = async () => {
      const isAuthorized = localStorage.getItem('user');
      const token = localStorage.getItem('userToken');

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

  const NewToken = (event) => {
    event.preventDefault();
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

  return (
    <div className="wrapper">
      <div className="wrapper">
        <form onSubmit={NewToken}>
          <h1>New Token</h1>

          <div className='input-box'>
            <label>Token name</label>
            <input type='text' placeholder='Token Name' value={TokenName} onChange={TokenNameHandler} />
            <FaUser className='icon' />
          </div>

          <div className='input-box'>
            <label>Expire Date</label>
            <input type='text' placeholder='Expire Date' value={ExpireDate} onChange={DateHandler} />
            <FaLock className='icon' />
          </div>

          <div>
            <button style={{ marginTop: 30 }} type='submit'>Create Token</button>
          </div>
        </form>
      </div>

      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Expiration Time</th>
            <th>Expire Button</th>
            <th>Set as Main</th>
          </tr>
        </thead>

        <tbody>
          {tokenList.map((item, index) => 
            <ExpireToken
              key={index}
              name={item.name} 
              expireDate={item.expireDate} 
              Maintoken={item.tokenValue}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserHome;