import React from "react";
import axios from "axios";

class Dashboard extends React.Component {
    state = {
        teams: []
    };

    table = () => {
        axios.get("http://localhost:8080/get-teams")
            .then(response => {
                if (response.data) {
                    this.setState({ teams: response.data });
                }
            })
            .catch(error => {
                console.error('Error fetching teams:', error);
            });
    };



    render() {
        return (
            <div>
                <button onClick={this.table}>Upload Teams</button>
                <h2>league table</h2>
                {this.state.teams.map((team, index) => (
                    <div key={index}>{team.name} | {team.score}</div>
                ))}
            </div>
        );
    }
}

export default Dashboard;
