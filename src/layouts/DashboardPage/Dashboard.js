// Dashboard.js
import React, { useState, useEffect } from 'react';
import TeamsTable from './TeamsTable';
import MatchesTable from './MatchesTable';
import BettingTable from './BettingTable';
import UserPanel from './UserPanel';
import OldMatchesTable from './OldMatchesTable';
import LiveTable from './LiveTable';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Dashboard({ user, setUser }) {
    const [activeTab, setActiveTab] = useState('Teams');
    const [bets, setBets] = useState([]);

    useEffect(() => {
        if (activeTab === 'Matches' && user) {
            fetchUserBets();
        }
    }, [activeTab, user]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const fetchUserBets = () => {
        const cookies = new Cookies();
        axios
            .post('http://localhost:8080/get-betting', null, {
                params: { secret: cookies.get('secret') },
            })
            .then((response) => {
                setBets(response.data);
            })
            .catch((error) => {
                console.error('Error fetching bets:', error);
            });
    };

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Teams' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Teams')}
                    >
                        Teams
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Matches' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Matches')}
                    >
                        Matches
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Betting' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Betting')}
                    >
                        Betting
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Live match' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Live match')}
                    >
                        Live matches
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Finished games' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Finished games')}
                    >
                        Finished games
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'User' ? 'active' : ''}`}
                        onClick={() => handleTabClick('User')}
                    >
                        User
                    </button>
                </li>
            </ul>
            <div className="tab-content">
                {activeTab === 'Teams' && <TeamsTable />}
                {activeTab === 'Matches' && <MatchesTable user={user} setUser={setUser} bets={bets} />}
                {activeTab === 'Betting' && <BettingTable />}
                {activeTab === 'Live match' && <LiveTable />}
                {activeTab === 'Finished games' && <OldMatchesTable />}
                {activeTab === 'User' && <UserPanel />}
            </div>
        </div>
    );
}

export default Dashboard;
