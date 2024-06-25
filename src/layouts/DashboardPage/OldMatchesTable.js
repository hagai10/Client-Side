import React, {useEffect, useState} from 'react';
import axios from "axios";

function OldMatchesTable(props) {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetchMatches();
    }, [])

    const fetchMatches = () => {
        axios.post("http://localhost:8080/get-matches-by-type",null,{
                params:{
                    type: "old"
                }
            })
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
                    <th>Num</th>
                    <th>Round</th>
                    <th>Date</th>
                    <th>Home Team</th>
                    <th>Visiting Team</th>
                    <th>result</th>


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
                        <td>{match.resultTeam1} : {match.resultTeam2}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default OldMatchesTable;