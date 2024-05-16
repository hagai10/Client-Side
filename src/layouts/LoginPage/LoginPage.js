// LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [hide, setHide] = useState(false);

    const navigate = useNavigate();

    const valueChanged = (key, e) => {
        if (key === "username") {
            setUsername(e.target.value);
        } else if (key === "password") {
            setPassword(e.target.value);
        }
        setSuccess(false);
        setError("");
    };

    const login = () => {
        axios
            .post("http://localhost:8080/login", null, {
                params: {
                    username: username,
                    password: password
                }
            })
            .then(response => {
                if (response.data.success) {
                    setSuccess(true);
                    setError("");
                    const cookies = new Cookies(null, { path: "/" });
                    cookies.set("id", response.data.id);
                    cookies.set("secret", response.data.secret);
                    navigate('/dashboard');
                } else {
                    setError(response.data.message);
                }
            })
            .catch(error => {
                setError("An error occurred. Please try again later.");
            });
    };

    const clicked = () => {
        setHide(true);
    };

    return (
        <div className="container mt-5">
            {!hide ? (
                <div>
                    <h3>Login Page</h3>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">User name:</label>
                            <div className="col-sm-10">
                                <input
                                    id="username"
                                    className="form-control"
                                    value={username}
                                    onChange={e => valueChanged("username", e)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
                            <div className="col-sm-10">
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={e => valueChanged("password", e)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10 offset-sm-2">
                                <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                            </div>
                        </div>
                    </form>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">Connection success</div>}
                    You don't have an account? <div style={{ color: "blue", cursor: "pointer" }} onClick={clicked}>Click Here</div>
                </div>
            ) : null}
        </div>
    );
}

export default LoginPage;
