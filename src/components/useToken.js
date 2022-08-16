
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

const GetToken = () => {
    const accessString = localStorage.getItem('access_token');
    const refreshString = localStorage.getItem('refresh_token');
    return {
        access_token: accessString,
        refresh_token: refreshString
    }
};

const SetToken = userToken => {
    localStorage.setItem('access_token', JSON.stringify(userToken.access_token));
    localStorage.setItem('refresh_token', JSON.stringify(userToken.refresh_token));
};

export default function RefreshToken(){
    const navigate = useNavigate();

    const handleRefresh = async () => {
        const tokens = GetToken();
        const decoded = jwt_decode(tokens.refresh_token);
        console.log(decoded)
        console.log(Math.floor(Date.now()/1000))
        if(decoded.exp < Math.floor(Date.now()/1000)){
            console.log("Refresh Token expired!");
            navigate("/");
        }
        else{
            if(window.confirm("Extend duration?")){
                console.log("Bearer " + tokens.refresh_token.slice(1, -1))
                const newTokens = await fetch("http://localhost:8080/user/token/refresh", {
                    method: 'GET',
                    headers: {"Authorization" : "Bearer " + tokens.refresh_token.slice(1, -1)}
                }).then(
                    data => data.json()
                );
                SetToken(newTokens);
            }
        }
    }

    return(
        <div>
            <button onClick={handleRefresh}>Refresh your token?</button>
        </div>
    )
}
