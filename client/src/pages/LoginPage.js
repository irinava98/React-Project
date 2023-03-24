import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function login(e) {
        e.preventDefault();
        await fetch("http://localhost:4000/login",{
            method: 'POST',
            body:JSON.stringify({username,password}),
            headers: { "Content-Type": "application/json" }
        })
    }

    const changeUsernameHandler = (e) => {
        setUsername(e.target.value);
    }

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
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
            <button>Login</button>
        </form>
    );
}