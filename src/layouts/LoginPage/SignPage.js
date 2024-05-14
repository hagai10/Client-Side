import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import LoginPage from "./LoginPage";

class SignPage extends React.Component {
    state = {
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
        success: false,
        error: "",
        hide:false
    };

    valueChanged = (key, e) => {
        this.setState({ [key]: e.target.value, success: false, error: "" });
    };

    signUp = () => {
        axios
            .post("http://localhost:8080/create-account", null, {
                params: {
                    username: this.state.username,
                    password: this.state.password,
                    password1: this.state.repeatPassword,
                    email: this.state.email
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
                {!this.state.hide ?(<div>
                <h3>Sign Page</h3>
                <form>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-2 col-form-label">User name:</label>
                        <div className="col-sm-5">
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
                        <div className="col-sm-5">
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
                        <label htmlFor="repeatPassword" className="col-sm-2 col-form-label">Repeat Password:</label>
                        <div className="col-sm-5">
                            <input
                                id="repeatPassword"
                                type="password"
                                className="form-control"
                                value={this.state.repeatPassword}
                                onChange={e => this.valueChanged("repeatPassword", e)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-5">
                            <input
                                id="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={e => this.valueChanged("email", e)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10 offset-sm-2">
                            <button className="btn btn-primary" onClick={this.signUp}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                    {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                    {this.state.success && <div className="alert alert-success">User is created</div>}
                   back to login page? <div style={{ color: "blue", cursor: "pointer" }} onClick={this.clicked}>Login</div>
                </form></div>):
                    (<div><LoginPage/></div>)}
            </div>
        );
    }
}

export default SignPage;
