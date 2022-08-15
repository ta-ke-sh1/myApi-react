import React from 'react';
import {useNavigate} from "react-router-dom";

export default class AdminHomepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        const usersList = await fetch('http://localhost:8080/user', {
            headers: {'Authorization': "Bearer " + localStorage.getItem("access_token").slice(1, -1)}
        })
            .then(data => data.json())
            .catch((error) => {
                if(error.response.status === 403){
                    const navigate = useNavigate();
                    navigate("/login");
                }
            })
        this.setState({users: usersList});
    }

    render() {
        const {users} = this.state;
        return (
            <table>
                <tbody>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Roles</th>
                    <th>Options</th>
                </tr>
                {users.map(user =>
                    <UserRow key={user.userId}
                             userId={user.userId}
                             username={user.username}
                             firstName={user.firstName}
                             lastName={user.lastName}
                             phone={user.phone}
                             address={user.address}
                             email={user.email}
                             dob={user.dob}
                             roles={user.roles}
                    />
                )}
                </tbody>
            </table>
        )
    }
}

const UserRow = (props) => {
    return (
        <tr key={props.userId}>
            <td>{props.username}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.phone}</td>
            <td>{props.address}</td>
            <td>{props.email}</td>
            <td>{props.dob}</td>
            <td>
                {props.roles.map(role =>
                    role.name
                )}
            </td>
            <td>
                <a href="/edit">
                    <div>Edit</div>
                </a>
                <a href="/delete">
                    <div>Delete</div>
                </a>
            </td>
        </tr>
    )
}