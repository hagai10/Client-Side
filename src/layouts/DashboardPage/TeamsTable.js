import React, {useEffect, useState} from 'react';
import axios from "axios";

function TeamsTable(props) {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchTeams();
    }   , [])
    const fetchTeams = () => {
        axios
            .get("http://localhost:8080/get-teams")
            .then((response) => {
                setTeams(response.data);
            })
            .catch((error) => {
                console.error("Error fetching teams:", error);
            });
    };
    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Num</th>
                    <th>Name</th>
                    <th>Played</th>
                    <th>W</th>
                    <th>O</th>
                    <th>L</th>
                    <th>Score</th>
                    <th>Goals</th>
                </tr>
                </thead>
                <tbody>
                {teams.map((team, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{team.name}</td>
                        <td>{team.won+team.drawn+team.lost}</td>
                        <td>{team.won}</td>
                        <td>{team.drawn}</td>
                        <td>{team.lost}</td>
                        <td>{team.score}</td>
                        <td>{team.goalsConcedes} : {team.goalsScored}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamsTable;