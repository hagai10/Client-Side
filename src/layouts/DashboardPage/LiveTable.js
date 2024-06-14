import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MatchesTable() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/sse-matches');

        eventSource.onmessage = function(event) {
            const match = JSON.parse(event.data);
            updateMatch(match); // Assuming you have a function to update matches state
        };

        return () => {
            eventSource.close();
        };
    }, []);

    // Function to update the matches state
    const updateMatch = (match) => {
        setMatches(prevMatches => {
            const updatedMatches = prevMatches.map(prevMatch => {
                if (prevMatch.id === match.id) {
                    return {
                        ...prevMatch,
                        resultTeam1: match.resultTeam1,
                        resultTeam2: match.resultTeam2
                        // Add other fields as needed
                    };
                }
                return prevMatch;
            });
            return updatedMatches;
        });
    };

    return (
        <div>
            <h1>Live Matches</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Num</th>
                    <th>Round</th>
                    <th>Date</th>
                    <th>Home Team</th>
                    <th>Visiting Team</th>
                    <th>Home team result</th>
                    <th>Visiting 'eam result</th>
                </tr>
                </thead>
                <tbody>
                {matches.map((match, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{match.roundNum}</td>
                        <td>{match.match_date}</td>
                        <td>{match.team1.name}</td>
                        <td>{match.team2.name}</td>
                        <td>{match.resultTeam1}</td>
                        <td>{match.resultTeam2}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatchesTable;
