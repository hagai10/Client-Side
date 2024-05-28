import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

function UserPanel() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const cookies = new Cookies();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = () => {
        axios.post("http://localhost:8080/get-user", null, {
            params: {
                secret: cookies.get("secret")
            }
        })
            .then(response => {
                setUsername(response.data.username);
                setEmail(response.data.email);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    };

    const valueChanged = (key, e) => {
        if (key === "username") {
            setUsername(e.target.value);
        } else if (key === "password") {
            setPassword(e.target.value);
        } else if (key === "repeatPassword") {
            setRepeatPassword(e.target.value);
        } else if (key === "email") {
            setEmail(e.target.value);
        }
        setSuccess(false);
        setError("");
    };

    const updateUser = () => {
        axios.post("http://localhost:8080/update-user", null, {
            params: {
                username: username,
                password: password,
                password1: repeatPassword,
                email: email,
                secret: cookies.get("secret")
            }
        })
            .then(response => {
                if (response.data.success) {
                    setSuccess(true);
                    setError("");
                } else {
                    setError(response.data.message);
                }
            })
            .catch(error => {
                setError("An error occurred. Please try again later.");
            });
    };

    return (
        <div className="container mt-5">
            <h3>User Panel</h3>
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
                    <label htmlFor="repeatPassword" className="col-sm-2 col-form-label">Repeat Password:</label>
                    <div className="col-sm-10">
                        <input
                            id="repeatPassword"
                            type="password"
                            className="form-control"
                            value={repeatPassword}
                            onChange={e => valueChanged("repeatPassword", e)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                    <div className="col-sm-10">
                        <input
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={e => valueChanged("email", e)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 offset-sm-2">
                        <button type="button" className="btn btn-primary" onClick={updateUser}>Update</button>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">User updated successfully</div>}
            </form>
        </div>
    );
}

export default UserPanel;
