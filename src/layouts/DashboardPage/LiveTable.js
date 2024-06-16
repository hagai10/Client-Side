import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { parse } from 'date-fns';

function MatchesTable() {
    const [matches, setMatches] = useState([]);
    const [timers, setTimers] = useState({});
    const timersRef = useRef({});

    useEffect(() => {
        fetchMatches();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimers = { ...timersRef.current };
            Object.keys(newTimers).forEach((key) => {
                if (newTimers[key].timeLeft > 0 && newTimers[key].start) {
                    newTimers[key].timeLeft -= 1;
                } else if (newTimers[key].timeLeft === 0) {
                    newTimers[key].start = false; // Stop the timer when it reaches 0
                } else {
                    const now = new Date();
                    const matchDate = newTimers[key].date;
                    if (now >= matchDate) {
                        newTimers[key].start = true;
                    }
                }
            });
            timersRef.current = newTimers;
            setTimers({ ...newTimers });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchMatches = () => {
        axios
            .get("http://localhost:8080/get-matches")
            .then((response) => {
                setMatches(response.data);
                const initialTimers = response.data.reduce((acc, match, index) => {
                    const matchDate = parse(match.date, 'dd/MM/yy HH:mm:ss', new Date());
                    acc[index] = { timeLeft: 30, start: false, date: matchDate };
                    return acc;
                }, {});
                timersRef.current = initialTimers;
                setTimers(initialTimers);
            })
            .catch((error) => {
                console.error("Error fetching matches:", error);
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
                                        {timers[index].start ? `${timers[index].timeLeft}s` : 'Awaiting match start'}
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

export default MatchesTable;
