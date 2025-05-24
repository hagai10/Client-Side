// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', null, {
                params: { username, password }
            });
            console.log('Response from server:', response.data);
            if (response.data.success && response.data.secret) {
                const { secret } = response.data;
                cookies.set('secret', secret, { path: '/' });
                // Fetch user details to include balance
                const userResponse = await axios.post('http://localhost:8080/get-user', null, {
                    params: { secret }
                });
                const user = userResponse.data;
                onLoginSuccess(user);
                console.log('Login successful, navigating to dashboard');
                navigate('/dashboard');
            } else {
                setError('Invalid username or password.');
                console.error('Login error: No secret returned from server', response.data);
            }
        } catch (error) {
            setError('Login failed. Please check your username and password.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
