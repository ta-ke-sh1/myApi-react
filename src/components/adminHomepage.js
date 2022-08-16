import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import RefreshToken from "./useToken";

export default function AdminHomepage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        let list = {}
        await axios.get('http://localhost:8080/user', {
            headers: {'Authorization': "Bearer " + localStorage.getItem("access_token").slice(1, -1)}
        }).then(function (response) {
            console.log(response)
            list = response.data;
        }).catch(function (error) {
            console.log(error.response.data);
            if (error.response.status === 403) {
                console.log(error.response.status)
                navigate('/login');
            }
        });
        setUsers(list);
    }

    useEffect(() => {
        getData().then(() => {
            console.log("Data fetched successfully")
        });
    }, []);

    async function handleDelete(event, userId) {
        event.preventDefault();
        await fetch('http://localhost:8080/user/delete/' + userId, {
            headers: {'Authorization': "Bearer " + localStorage.getItem("access_token").slice(1, -1)}
        }).then(
        ).catch((error) => {
            console.log(error);
        })
    }

    async function handleManage(event, userId) {
        console.log(userId)
        event.preventDefault();
        navigate("/user/details/", {
            state: {userId}
        })

    }

    const parseDate = (dob) => {
        return dob.join("/");
    }

    return (
        <div className={"container"}>
            <RefreshToken/>
            <table className={"table"}>
                <tbody>
                <tr className={"table-row"}>
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
                             dob={parseDate(user.dob)}
                             roles={user.roles}
                             handleManage = {(e) => handleManage(e, user.userId)}
                             handleDelete = {(e) => handleDelete(e, user.userId)}
                    />
                )}
                </tbody>
            </table>
        </div>
    )
}

const UserRow = (props) => {
    return (
        <tr key={props.userId} className={"table-row"}>
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
                <button className={"manage"} onClick={(e) => props.handleManage(e)}>
                    Manage
                </button> <br/>
                <button className={"delete"} onClick={(e) => props.handleDelete(e)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}