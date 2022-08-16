
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { v4 as uuid } from "uuid";

const roles = [
    "ROLE_USER",
    "ROLE_ADMIN",
    "ROLE_SUPER_ADMIN"
]

export default function ManageUser() {
    const location = useLocation();
    const {userId} = location.state;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [role, setRole] = useState();


    useEffect(() => {
        const getData = async () => {
            await axios.get('http://localhost:8080/user/' + userId, {
                headers: { 'Authorization': "Bearer " + localStorage.getItem("access_token").slice(1, -1) }
            }).then(function (response) {
                const user = response.data;
                console.log(user)
            }).catch(function (error) {
                console.log(error.response.data);
                if (error.response.status === 403) {
                    console.log(error.response.status)
                }
            });
            setUser(u => user);
        }

        getData().then(() => {
            console.log("Data fetched successfully")
        });
    }, [user, userId]);

    const handleRole = (event) => {
        setRole(event.target.value)
    }

    const updateUser = async (user) => {
        console.log(user);
        await axios.post('http://localhost:8080/user/update/', user, {
            'Content-Type': 'application/json'
        })
            .then(result => console.log('success====:', result))
            .catch(error => console.log('error============:', error));
    }

    const handleSubmit = () => {
        updateUser({
            "userId": userId,
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "password": password,
            "phone": phone,
            "address": address,
            "email": email,
            "dob": dob,
            "role": role
        })
    }

    return (
        <div className={"form-container"}>
            <label htmlFor="">First Name</label><br />
            <input type="text" name="firstName" id="firstName" onChange={(event) => setFirstName(event.target.value)} />
            <br />
            <label htmlFor="">Last Name</label><br />
            <input type="text" name="lastName" id="lastName" onChange={(event) => setLastName(event.target.value)} />
            <br />
            <label htmlFor="">Email</label><br />
            <input type="text" name="email" id="email" onChange={(event) => setEmail(event.target.value)}  />
            <br />
            <label htmlFor="">Phone Number</label><br />
            <input type="text" name="phone" id="phone" onChange={(event) => setPhone(event.target.value)}  />
            <br />
            <label htmlFor="">Address</label><br />
            <input type="text" name="address" id="address" onChange={(event) => setAddress(event.target.value)} />
            <br />
            <label htmlFor="">Date of Birth</label><br />
            <input type="date" name="dob" id="dob" onChange={(event) => setDob(event.target.value)}  />
            <br />
            <label htmlFor="">Select a role</label><br />
            <select name="role" id="role" value={role} onChange={(event) => handleRole(event)}  >
                <option value={roles[0]}>User</option>
                <option value={roles[1]}>Admin</option>
                <option value={roles[2]}>Super Admin</option>
            </select>
            <br />
            <input type="submit" value="Update" onClick={handleSubmit} />
        </div>
    );
}