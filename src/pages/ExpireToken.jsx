import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



const ExpireToken = (props) => {

  const [error, setError] = useState(null);
  const [Expire, setExpire] = useState('Expire');
  const name = props.name;
  const tokenValue = props.Maintoken;

  const updateStatus = async () => {
    
    const token = localStorage.getItem('userToken');
    
    const url = `http://localhost:8080/user/api-tokens`;
    const body = {
      name: name,
      tokenValue: tokenValue
    }

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setExpire("Expired")
      } else {
        setError(`Failed`);
      }
    } catch (error) {
      setError(`Error fetching`);
    }
  };

  const ExpireHandler = () => {
    setExpire('Expired');
    updateStatus();
  };
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.expireDate}</td>
      <td>
        <button type="button" className="btn btn-outline-danger" onClick={ExpireHandler} > {Expire} </button>
      </td>
      
    </tr>
  );
}

export default ExpireToken;