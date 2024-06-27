import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



const ExpireToken = (props) => {

  let token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [Expire, setExpire] = useState('Expire');
  
  const ExpireHandler = () => {

  }

  const SetMain = () => {
    localStorage.setItem('token', props.Maintoken);
    alert("Main token has been set successfuly. ");
    token = localStorage.getItem('userToken');
  }

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