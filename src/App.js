import {BrowserRouter as Router, useRoutes} from "react-router-dom";
import Login from "./components/login.js";
import AdminHomepage from './components/adminHomepage'
import useToken from "./components/useToken";

const App = () => {
    return useRoutes([
        {path: "/", element: <AdminHomepage/>}
    ]);
};

const getToken = () =>{
    const accessString = "Bearer " + localStorage.getItem('access_token');
    const refreshString = "Bearer " + localStorage.getItem('refresh_token');
    const userToken = {
        access_token: accessString,
        refresh_token: refreshString
    };
    return userToken?.token
}

const AppWrapper = () => {
    const { token, setToken } = useToken();
    if (token.access_token.endsWith("null") || token.refresh_token.endsWith("null")) {
        return <Login setToken={setToken}/>
    }

    return (
        <Router>
            <App/>
        </Router>
    );
};

export default AppWrapper;
