import { useState, useEffect } from "react";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const UserHome = () => {

  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [tokenList, setTokenList] = useState(null);
  const [Expire, setExpire] = useState('Expire');

  const expHandler = () => {
    setExpire('Expired')
  }

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/api-tokens', {
          method: 'GET',
          headers: {
            'Authorization': token
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
        <table className="table table-striped-columns">
          <thead>
            <tr>
            
              <th> Token Name </th>
              <th> Expiration Time </th>
              <th> Expire Button </th>
            </tr>
          </thead>

          <tbody>
            {tokenList.map(item => 
              <tr>
                <td> {item.name} </td>
                <td> {item.expireDate} </td>
                <td> <button className="btn btn-outline-danger" onClick={expHandler}> {Expire} </button> </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

}

export default UserHome;