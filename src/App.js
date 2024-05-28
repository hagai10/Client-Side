import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Dashboard from './layouts/DashboardPage/Dashboard';
import AuthenticationTabs from './layouts/LoginPage/AuthenticationTabs';
import Header from './components/Header';
import Footer from './components/Footer';
import UserPanel from './layouts/DashboardPage/UserPanel';
import LoginPage from './layouts/LoginPage/LoginPage';
import Cookies from 'universal-cookie';
import axios from 'axios';
import BalanceUpdate from './layouts/DashboardPage/BalanceUpdate';

function App() {
    const [user, setUser] = useState(null);
    const cookies = new Cookies();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        const secret = cookies.get('secret');
        if (secret) {
            axios.post('http://localhost:8080/get-user', null, {
                params: { secret }
            }).then(response => {
                setUser(response.data);
            }).catch(() => {
                setUser(null);
            });
        }
    };

    const logout = () => {
        cookies.remove('secret');
        setUser(null);
    };

    return (
        <Router>
            <div>
                <Header user={user} logout={logout} />
                <Routes>
                    <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/user-panel" element={user ? <UserPanel /> : <Navigate to="/login" />} />
                    <Route path="/balance-update" element={user ? <BalanceUpdate user={user} setUser={setUser} /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!user ? <AuthenticationTabs setUser={setUser} /> : <Navigate to="/dashboard" />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
