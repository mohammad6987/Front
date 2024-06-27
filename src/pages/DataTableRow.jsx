import { useState, useEffect } from "react";

const DataTableRow = (props) => {
  
  const [status, setStatus] = useState(String(props.button));
  const [error, setError] = useState(null);

  const updateStatus = async (newStatus) => {
    const token = localStorage.getItem('adminToken');
    const username = props.username;
    const url = `http://localhost:8080/admin/username=${username}&active=${newStatus}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': token
        }
      });

      if (response.ok) {
        setStatus(String(newStatus));
        // console.log(status);
      } else {
        setError(`Failed`);
      }
    } catch (error) {
      setError(`Error fetching`);
      console.log(error);
    }
  };

  const buttonHandler = () => {
    let newStatus = null;
    if (status == "true") {
      newStatus = "false";
    } else {
      newStatus = "true";
    }
    updateStatus(newStatus);
  };

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.username}</td>
      <td>{props.SignDate}</td>
      <td>
        <button type="button" className="btn btn-outline-primary" onClick={buttonHandler}> {status} </button>
      </td>
    </tr>
  );
};

export default DataTableRow;