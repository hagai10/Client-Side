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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {teams.map((team, index) => (
                    <tr key={index}>
                        <td>{team.id}</td>
                        <td>{team.name}</td>
                        <td>{team.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamsTable;