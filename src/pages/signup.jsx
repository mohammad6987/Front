import { useState, useEffect } from 'react';

const signUp = () => {

    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');

    return(
        <form>
            <label> Sign Up </label>
            <div>
                
            </div>
            <input type='text' value={username} onChange={usernameHandler}></input>
        </form>
    )
}

export default signUp;