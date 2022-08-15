import {useState} from 'react';

export default function useToken() {
    const getToken = () => {
        const accessString = "Bearer " + localStorage.getItem('access_token');
        const refreshString = "Bearer " + localStorage.getItem('refresh_token');
        return {
            access_token: accessString,
            refresh_token: refreshString
        }
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('access_token', JSON.stringify(userToken.access_token));
        localStorage.setItem('refresh_token', JSON.stringify(userToken.refresh_token));
        setToken({
            access_token: userToken.access_token,
            refresh_token: userToken.refresh_token
        });
    };

    return {
        setToken: saveToken,
        token
    }
}