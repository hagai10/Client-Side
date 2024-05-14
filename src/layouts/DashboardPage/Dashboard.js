import React, { useState } from 'react';
import TeamsTable from './TeamsTable';
import MatchesTable from './MatchesTable';
import BettingTable from './BettingTable';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('Teams');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
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
            </ul>
            <div className="tab-content">
                {activeTab === 'Teams' && <TeamsTable />}
                {activeTab === 'Matches' && <MatchesTable />}
                {activeTab === 'Betting' && <BettingTable />}
            </div>
        </div>
    );
}

export default Dashboard;
