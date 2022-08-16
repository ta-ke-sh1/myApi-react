import React, {useState} from "react";
import {} from '../styles/form.scss'
import {useNavigate} from "react-router-dom";
import qs from 'qs';
import jwt_decode from "jwt-decode";

async function loginUser(credentials) {
    console.log(credentials);
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: qs.stringify(credentials)
    }).then(
        data => data.json()
    )
}

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        })

        localStorage.setItem('access_token', JSON.stringify(token.access_token));
        localStorage.setItem('refresh_token', JSON.stringify(token.refresh_token));

        const decoded = jwt_decode( token.access_token);
        console.log(decoded);

        switch (decoded.roles[0]){
            case "ROLE_USER":
                return navigate("/user");
            case "ROLE_ADMIN":
                return navigate("/");
            case "ROLE_SUPER_ADMIN":
                return navigate("/")
            default:
                break;
        }
    }

    return (
        <div className='form-container'>
            <label>Username</label>
            <br/>
            <input type={"text"} id="username" name={"username"} onChange={e => setUsername(e.target.value)}/> <br/>
            <label>Password</label>
            <br/>
            <input type={"password"} id="password" name={"password"} onChange={e => setPassword(e.target.value)}/> <br/>
            <label>Forgot password? <a href="/recover">Recover it!</a></label> <br/>
            <input type={"submit"} value={"Login"} onClick={handleSubmit}/> <br/>
            <label>Not an user? <a href="/register">Register here!</a></label> <br/>
        </div>
    )
}
