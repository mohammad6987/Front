import './login.css';
import { useNavigate } from 'react-router-dom';


const Main = () => {

  const navigate = useNavigate();

  const SignUpHandler = () => {
    navigate('/SignUp');  
  }

  const LoginHandler = () => {
    navigate('/login');
  }

  return(
    <div className='wrapper'>
      <h1> Welcome </h1>

      <button onClick={SignUpHandler}> Sign Up </button>

      <button onClick={LoginHandler}> Log in </button>
    </div>
  );
}

export default Main;