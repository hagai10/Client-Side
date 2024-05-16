// AuthenticationTabs.js
import React from "react";
import LoginPage from "./LoginPage";
import SignPage from "./SignPage";

class AuthenticationTabs extends React.Component {
    state = {
        activeTab: "login"
    };

    changeTab = (tab) => {
        this.setState({ activeTab: tab });
    };

    render() {
        return (
            <div className="container mt-5">
                <h3 className="text-center">Login / Sign up</h3>
                <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={"nav-link " + (this.state.activeTab === "login" ? "active" : "")} onClick={() => this.changeTab("login")}>Login</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={"nav-link " + (this.state.activeTab === "sign" ? "active" : "")} onClick={() => this.changeTab("sign")}>Sign Up</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className={"tab-pane fade " + (this.state.activeTab === "login" ? "show active" : "")} id="login" role="tabpanel">
                        <LoginPage changeTab={this.changeTab} />
                    </div>
                    <div className={"tab-pane fade " + (this.state.activeTab === "sign" ? "show active" : "")} id="signup" role="tabpanel">
                        <SignPage changeTab={this.changeTab} />
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthenticationTabs;
