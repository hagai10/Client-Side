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
                console.log('Matches fetched:', response.data)
                console.log(matches)
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
                    <th>Home Team</th>
                    <th>Visiting Team</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {matches.map((match, index) => (
                    <tr key={index}>
                        <td>{match.id}</td>
                        {/*<td>{match.team1.name}</td>*/}
                        {/*<td>{match.team2.name}</td>*/}
                        <td>{(match.date)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatchesTable;