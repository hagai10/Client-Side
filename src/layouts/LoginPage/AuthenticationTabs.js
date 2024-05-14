import React from "react";
import LoginPage from "./LoginPage";
import SignPage from "./SignPage";

class AuthenticationTabs extends React.Component {
    render() {
        return (
            <div className="container mt-5">
                <h3 className="text-center">Login / Sign up</h3>
                <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">Login</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab" aria-controls="signup" aria-selected="false">Sign Up</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                        <LoginPage />
                    </div>
                    <div className="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
                        <SignPage />
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthenticationTabs;
