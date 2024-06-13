import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function BalanceUpdate({ user, setUser }) {
    const [newBalance, setNewBalance] = useState('');
    const [error, setError] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleBalanceUpdate = async () => {
        try {
            const response = await axios.post('http://localhost:8080/update-balance', null, {
                params: {
                    secret: cookies.get('secret'),
                    balanceToAdd: newBalance
                }
            });

            if (response.data.success) {
                setUser(prevUser => ({ ...prevUser, balance: parseFloat(response.data.user.balance) }));
                navigate('/dashboard');
            } else {
                setError('Failed to update balance');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <h3>Update Balance</h3>
            <div className="form-group">
                <label>Current Balance: ${user?.balance ? user.balance.toFixed(2) : 'N/A'}</label>
            </div>
            <div className="form-group">
                <label>New Balance:</label>
                <input
                    type="number"
                    className="form-control"
                    value={newBalance}
                    onChange={(e) => setNewBalance(e.target.value)}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="btn btn-primary" onClick={handleBalanceUpdate}>Update Balance</button>
        </div>
    );
}

export default BalanceUpdate;
