import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { parse } from 'date-fns';

function LiveTable() {
    const [matches, setMatches] = useState([]);
    const [timers, setTimers] = useState({});
    const timersRef = useRef({});

    useEffect(() => {
        fetchMatches();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Fetch updated matches every second
            fetchUpdatedMatches();

            const newTimers = { ...timersRef.current };
            const updatedMatches = matches.filter((match, index) => {
                if (newTimers[index].currentTimer < 30  && newTimers[index].start) {
                    newTimers[index].currentTimer += 1;
                    return true;
                } else if (newTimers[index].currentTimer > 30) {
                    newTimers[index].start = false; // Stop the timer when it reaches 0
                    return false; // Remove match from live table
                } else {
                    const now = new Date();
                    const matchDate = newTimers[index].date;
                    if (now >= matchDate) {
                        newTimers[index].start = true;
                    }
                    return true;
                }
            });
            timersRef.current = newTimers;
            setTimers({ ...newTimers });
            setMatches(updatedMatches);
        }, 1000);

        return () => clearInterval(interval);
    }, [matches]);

    const fetchMatches = () => {
        axios
            .get("http://localhost:8080/get-live-match")
            .then((response) => {
                setMatches(response.data);
                const initialTimers = response.data.reduce((acc, match, index) => {
                    const matchDate = parse(match.date, 'dd/MM/yy HH:mm:ss', new Date());
                    acc[index] = { currentTimer:0, start: false, date: matchDate };
                    return acc;
                }, {});
                timersRef.current = initialTimers;
                setTimers(initialTimers);
            })
            .catch((error) => {
                console.error("Error fetching matches:", error);
            });
    };

    const fetchUpdatedMatches = () => {
        axios
            .get("http://localhost:8080/get-live-match")  // Changed to get-old-matches
            .then((response) => {
                setMatches(response.data);
            })
            .catch((error) => {
                console.error("Error fetching updated matches:", error);
            });
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center">Live Matches</h1>
            {matches.map((match, index) => (
                <div key={index} className="card my-4" style={{ backgroundColor: '#28a745', color: 'white' }}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text-left">
                                <h4>{match.team1.name}</h4>
                            </div>
                            <div className="text-center">
                                <h2>{match.resultTeam1} - {match.resultTeam2}</h2>
                                {timers[index] && (
                                    <span className="badge badge-pill badge-warning p-2 mt-2" style={{ fontSize: '1.2rem' }}>
                                        <i className="fas fa-clock mr-2"></i>
                                        {timers[index].start ? `${timers[index].currentTimer}s` : 'Awaiting match start'}
                                    </span>
                                )}
                            </div>
                            <div className="text-right">
                                <h4>{match.team2.name}</h4>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <div>Round: {match.roundNum}</div>
                            <div>Date: {match.date}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LiveTable;
