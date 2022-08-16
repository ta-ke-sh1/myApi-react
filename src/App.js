import {BrowserRouter as Router, useNavigate, useRoutes} from "react-router-dom";
import AdminHomepage from './components/adminHomepage';
import RegisterForm from "./components/users/registerForm";
import Login from "./components/Login";
import AddUserForm from "./components/users/addForm";
import ManageUser from "./components/users/manageUser";
import RefreshToken from "./components/useToken";
import Header from "./Header";
import {} from './styles/base.scss'
import {useEffect} from "react";



const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {

    })
}

const App = () => {
    return useRoutes([
        {path: "/", element: <AdminHomepage/>},
        {path: "/register", element: <RegisterForm/>},
        {path: "/user/add", element: <AddUserForm/>},
        {path: "/login", element: <Login/>},
        {path: "/refresh/token", element: <RefreshToken/> },
        {path: "/user/details/", element: <ManageUser /> },
        {path: "/logout", element: <Logout /> },
    ]);
};


const AppWrapper = () => {
    return (
        <Router>
            <Header />
            <App/>
        </Router>
    );
};

export default AppWrapper;
