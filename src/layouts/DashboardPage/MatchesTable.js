import React, {useEffect, useState} from 'react';
import axios from "axios";

function MatchesTable(props) {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetchMatches();
    }, [])

    const fetchMatches = () => {
        axios
            .get("http://localhost:8080/get-matches")
            .then((response) => {
                setMatches(response.data);
            })
            .catch((error) => {
                console.error("Error fetching matches:", error);
            });
    };
    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name Home Team</th>
                    <th>name Other Team</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {matches.map((match, index) => (
                    <tr key={index}>
                        <td>{match.id}</td>
                        <td>{match.team1}</td>
                        <td>{match.team2}</td>
                        <td>{(match.date)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatchesTable;