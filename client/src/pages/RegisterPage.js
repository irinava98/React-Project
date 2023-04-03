import { useState } from "react";
import { Navigate } from "react-router-dom";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect,setRedirect] = useState(false);

    async function register(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        });
        if (response.status !== 200) {
            alert("registration failed");
        } else {
            alert("registration successful");
            setRedirect(true);
        }
    }

    const changeUsernameHandler = (e) => {
        setUsername(e.target.value);
    }

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    if (redirect) {
        return (<Navigate to = {'/login'} />);
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={changeUsernameHandler}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={changePasswordHandler}
            />
            <button>Register</button>
        </form>
    );
}

export default RegisterPage;
