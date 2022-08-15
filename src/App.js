import {BrowserRouter as Router, useRoutes} from "react-router-dom";
import {useState} from "react";
import Login from "./components/login.js";
import AdminHomepage from './components/adminHomepage'

function setToken(userToken){
    sessionStorage.setItem('access_token', JSON.stringify(userToken.access_token));
    sessionStorage.setItem('refresh_token', JSON.stringify(userToken.refresh_token));
}

function getToken(){

}

const App = () => {
    return useRoutes([
        {path: "/login", element: <Login/>},
        {path: "/users", element: <AdminHomepage/>}
    ]);
};

const AppWrapper = () => {
    const [token, setToken] = useState({
        access_token: null,
        refresh_token: null
    });

    if(!token){
        return <Login setToken={setToken} />
    }

    return (
        <Router>
            <App/>
        </Router>
    );
};

export default AppWrapper;
