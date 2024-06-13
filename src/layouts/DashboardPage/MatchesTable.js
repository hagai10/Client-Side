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
    const letsBet = () => {

    };
    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Num</th>
                    <th>Round</th>
                    <th>Date</th>
                    <th>Home Team</th>
                    <th>Visiting Team</th>
                    <th>1</th>
                    <th>x</th>
                    <th>2</th>

                </tr>
                </thead>
                <tbody>
                {matches.map((match, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{match.roundNum}</td>
                        <td>{(match.date)}</td>
                        <td>{match.team1.name}</td>
                        <td>{match.team2.name}</td>
                        <td>{match.oddsTeam1}</td>
                        <td>{match.oddsDraw}</td>
                        <td>{match.oddsTeam2}</td>
                        <td><button className="btn btn-primary" onClick={letsBet}>bet</button></td>


                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatchesTable;