import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



const ExpireToken = (props) => {

  const [Expire, setExpire] = useState('Expire');
  let token = null;
  
  const ExpireHandler = () => {
    setExpire('Expired');
  }

  const SetMain = () => {
    localStorage.setItem('token', props.Maintoken);
    alert("Main token has been set successfuly. ");
    token = localStorage.getItem('token');
    // console.log(token);
  }

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.expireDate}</td>
      <td>
        <button type="button" class="btn btn-outline-danger" onClick={ExpireHandler} > {Expire} </button>
      </td>
      <td>
        <button type="button" className="btn btn-outline-success" onClick={SetMain}> MainToken </button>
      </td>
    </tr>
  );
}

export default ExpireToken;