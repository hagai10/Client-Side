import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import SignPage from "./SignPage";

class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        success: false,
        secret: "",
        hide: false,
        error: ""
    };

    valueChanged = (key, e) => {
        this.setState({ [key]: e.target.value, success: false, error: "" });
    };

    login = () => {
        axios
            .post("http://localhost:8080/login", null, {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
            .then(response => {
                if (response.data.success) {
                    this.setState({ success: true, error: "" });
                    const cookies = new Cookies(null, { path: "/" });
                    cookies.set("id", response.data.id);
                    cookies.set("secret", response.data.secret);
                } else {
                    this.setState({ error: response.data.message });
                }
            })
            .catch(error => {
                this.setState({ error: "An error occurred. Please try again later." });
            });
    };

    clicked = () => {
        this.setState({ hide: true });
    };

    render() {
        return (
            <div className="container mt-5">
                {!this.state.hide ? (
                    <div>
                        <h3>Login Page</h3>
                        <form>
                            <div className="form-group row">
                                <label htmlFor="username" className="col-sm-2 col-form-label">User name:</label>
                                <div className="col-sm-10">
                                    <input
                                        id="username"
                                        className="form-control"
                                        value={this.state.username}
                                        onChange={e => this.valueChanged("username", e)}
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
                                        value={this.state.password}
                                        onChange={e => this.valueChanged("password", e)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10 offset-sm-2">
                                    <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
                                </div>
                            </div>
                        </form>
                        {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                        {this.state.success && <div className="alert alert-success">Connection success</div>}
                        You don't have an account? <div style={{ color: "blue", cursor: "pointer" }} onClick={this.clicked}>Sign up</div>
                    </div>
                ) : (
                    <div><SignPage /></div>
                )}
            </div>
        );
    }
}

export default LoginPage;
