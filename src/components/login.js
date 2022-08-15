import React, {useState} from "react";
import PropTypes from 'prop-types'
import {} from '../styles/form.scss'
import qs from 'qs';

async function loginUser(credentials){
    console.log(credentials);
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: qs.stringify(credentials)
    }).then(data => data.json())
}

export default function Login({ setToken }){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        })
        console.log(token)
        setToken({
            access_token: token.access_token,
            refresh_token: token.refresh_token
        });
    }
    return(
        <div className='form-container'>
            <form method="post" className="form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type={"text"} id="username" name={"username"} onChange={e => setUsername(e.target.value)}/> <br/>
                <label>Password</label>
                <input type={"password"} id="password" name={"password"} onChange={e => setPassword(e.target.value)}/> <br/>
                <label>Not an user? <a href="/register">Register here!</a></label> <br/>
                <input type={"submit"} value={"Login"}/> <br/>
            </form>
        </div>
    )
}


Login.propTypes = {
    setAccessToken: PropTypes.func.isRequired,
    setRefreshToken: PropTypes.func.isRequired
}