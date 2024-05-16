// SignPage.js
import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

class SignPage extends React.Component {
    state = {
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
        success: false,
        error: "",
        hide: false,
        refresh: false
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
                    this.setState({ error: response.data.message, success: false });
                }
            })
            .catch(error => {
                this.setState({ error: "An error occurred. Please try again later.", success: false });
            });
    };

    clicked = () => {
        this.setState({ hide: true, refresh: true });
        this.props.changeTab("login");
    };

    render() {
        return (
            <div className="container mt-5">
                {!this.state.hide ? (
                    <div>
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
                                    <button className="btn btn-primary" onClick={this.signUp}>Sign Up</button>
                                </div>
                            </div>
                            {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                            {this.state.success && <div className="alert alert-success">User is created</div>}
                            back to login page? <span style={{ color: "blue", cursor: "pointer" }} onClick={this.clicked}>Login</span>
                        </form>
                    </div>
                ) : null}
                {this.state.refresh && this.state.hide ? <SignPage changeTab={this.props.changeTab} /> : null}
            </div>
        );
    }
}

export default SignPage;
