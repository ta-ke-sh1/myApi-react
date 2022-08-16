import {BrowserRouter as Router, useRoutes} from "react-router-dom";
import AdminHomepage from './components/adminHomepage';
import RegisterForm from "./components/users/registerForm";
import Login from "./components/login";
import AddUserForm from "./components/users/addForm";
import ManageUser from "./components/users/manageUser";
import RefreshToken from "./components/useToken";

const App = () => {
    return useRoutes([
        {path: "/", element: <AdminHomepage/>},
        {path: "/register", element: <RegisterForm/>},
        {path: "/user/add", element: <AddUserForm/>},
        {path: "/login", element: <Login/>},
        {path: "/refresh/token", element: <RefreshToken/> },
        {path: "/user/details/", element: <ManageUser /> },
    ]);
};


const AppWrapper = () => {

    return (
        <Router>
            <App/>
        </Router>
    );
};

export default AppWrapper;
