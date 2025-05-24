// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, logout }) {
    return (
        <header className="bg-light py-2">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src="/soccer_league_logo.png" alt="Soccer League Logo" style={{ height: '40px', marginRight: '20px' }} />
                    <h1 className="me-3">Soccer League</h1>
                    <Link className="btn btn-link" to="/dashboard">Home</Link>
                </div>
                <nav>
                    {user ? (
                        <div className="d-flex align-items-center">
                            <span className="me-3">
                                Welcome, <Link to="/user-panel" className="text-decoration-none">{user.username}</Link>
                                <br />
                                <Link to="/balance-update" className="text-decoration-none">
                                    Balance: ${user.balance !== undefined ? user.balance.toFixed(2) : 'N/A'}
                                </Link>
                            </span>
                            <button className="btn btn-danger" onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <Link className="btn btn-primary" to="/login">Login/Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
