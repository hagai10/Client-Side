import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import { useNavigate } from 'react-router-dom';

function AuthenticationTabs({ setUser }) {
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();

    const handleLoginSuccess = (user) => {
        setUser(user);
        navigate('/dashboard'); // Navigate to dashboard on successful login
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center">Login / Sign up</h3>
            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === 'signup' ? 'active' : ''}`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Sign Up
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`} id="login" role="tabpanel">
                    <LoginPage onLoginSuccess={handleLoginSuccess} />
                </div>
                <div className={`tab-pane fade ${activeTab === 'signup' ? 'show active' : ''}`} id="signup" role="tabpanel">
                    <SignUpPage />
                </div>
            </div>
        </div>
    );
}

export default AuthenticationTabs;
