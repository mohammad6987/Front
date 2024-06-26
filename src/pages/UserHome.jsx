import { useState, useEffect } from "react";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpireToken from "./ExpireToken";
import { FaUser, FaLock } from "react-icons/fa";



const UserHome = () => {

  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [tokenList, setTokenList] = useState(null);
  const [TokenName, setTokenName] = useState('');
  const [ExpireDate, setExpireDate] = useState('');

  const NewToken = () => {

  }

  const TokenNameHandler = (event) => {
    setTokenName(event.target.value);
  }

  const DateHandler = (event) => {
    setExpireDate(event.target.value);
  }

  const fetchTokens = async () => {
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
        console.log(data);
      } else {
        setError(`Failed to fetch users:`);
      }
    } catch (error) {
      setError(`Error fetching users: ${error.message}`);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);
  

  if (error) {
    return (
      <div className="wrapper"> {error} </div>
    );
  } else if (!tokenList) {
    return (
      <div className="wrapper"> Loading... </div>
    );
  } else {
    return (
      <div className="wrapper">
        <div className="wrapper">
          <form onSubmit={NewToken}>
            <h1>
              New Token
            </h1>

            <div className='input-box'>
              <label> Token name </label>
              <input type='text' placeholder='Token Name' value={TokenName} onChange={TokenNameHandler}></input>
              <FaUser className='icon' />
             
            </div>

            <div className='input-box'>
              <label> Expire Date </label>
              <input type='text' placeholder='Expire Date' value={ExpireDate} onChange={DateHandler}></input>
              <FaLock className='icon' />
              
              
            </div>

            <div>
              <button style={ { marginTop: 30} } type='submit'> Create Token </button>
            </div>
          </form>
          
        </div>

        <table className="table table-striped-columns">
          <thead>
            <tr>
            
              <th> Token Name </th>
              <th> Expiration Time </th>
              <th> Expire Button </th>
              <th> Set as Main </th>
            </tr>
          </thead>

          <tbody>
            {tokenList.map( (item, index) => 
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

}

export default UserHome;