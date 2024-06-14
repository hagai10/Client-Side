import React, { useState } from 'react';
import TeamsTable from './TeamsTable';
import MatchesTable from './MatchesTable';
import BettingTable from './BettingTable';
import UserPanel from './UserPanel';
import OldMatchesTable from "./OldMatchesTable";
import LiveTable from "./LiveTable";

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
                {activeTab === 'Matches' && <MatchesTable />}
                {activeTab === 'Betting' && <BettingTable />}
                {activeTab === 'Live match' && <LiveTable />}
                {activeTab === 'Finished games' && <OldMatchesTable/>}
                {activeTab === 'User' && <UserPanel />}
            </div>
        </div>
    );
}

export default Dashboard;
