import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

function MatchesTable({ user, setUser }) {
    const [matches, setMatches] = useState([]);
    const [bettingMatch, setBettingMatch] = useState(null);
    const [betAmount, setBetAmount] = useState('');
    const [selectedResult, setSelectedResult] = useState('');
    const [error, setError] = useState('');
    const [betPlaced, setBetPlaced] = useState([]);

    const cookies = new Cookies();

    useEffect(() => {
        fetchMatches();
        fetchBetting();
    }, []);

    const fetchMatches = () => {
        axios.get("http://localhost:8080/get-matches")
            .then(response => {
                setMatches(response.data);
            })
            .catch(error => {
                console.error("Error fetching matches:", error);
            });
    };

    const fetchBetting = () => {
        axios.post("http://localhost:8080/get-betting", null, {
            params: { secret: cookies.get('secret') }
        })
            .then(response => {
                setBetPlaced(response.data.map(bet => bet.match.id));
            })
            .catch(error => {
                console.error("Error fetching bets:", error);
            });
    };

    const handleBetClick = (match) => {
        setBettingMatch(match);
        setBetAmount('');
        setSelectedResult('');
        setError('');
    };

    const handleCancelBet = () => {
        setBettingMatch(null);
    };

    const handleConfirmBet = async () => {
        if (!user || typeof user.balance === 'undefined') {
            setError('User balance is not defined');
            return;
        }

        const currentBalance = user.balance;

        if (betAmount <= 0 || betAmount > currentBalance) {
            setError('Invalid bet amount');
            return;
        }

        if (!selectedResult) {
            setError('You must select a result');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/add-bet', null, {
                params: {
                    matchId: bettingMatch.id,
                    secret: cookies.get('secret'),
                    sumOfBet: betAmount,
                    result: selectedResult
                }
            });

            if (response.data.success) {
                setUser(prevUser => ({
                    ...prevUser,
                    balance: response.data.user.balance
                }));
                setBetPlaced([...betPlaced, bettingMatch.id]);
                setBettingMatch(null);
                setError('');
            } else {
                setError('Failed to place bet.');
            }
        } catch (err) {
            setError('Failed to place bet.');
            console.error('Error placing bet:', err);
        }
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
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {matches.map((match, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{match.roundNum}</td>
                        <td>{(match.date)}</td>
                        <td>{match.team1.name}</td>
                        <td>{match.team2.name}</td>
                        <td>{match.oddsTeam1}</td>
                        <td>{match.oddsDraw}</td>
                        <td>{match.oddsTeam2}</td>
                        <td>
                            {bettingMatch && bettingMatch.id === match.id ? (
                                <>
                                    <input
                                        type="number"
                                        value={betAmount}
                                        onChange={(e) => setBetAmount(e.target.value)}
                                        placeholder="Bet Amount"
                                        className="form-control"
                                    />
                                    <select
                                        value={selectedResult}
                                        onChange={(e) => setSelectedResult(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="">Select Result</option>
                                        <option value="0">Draw</option>
                                        <option value="1">{match.team1.name}</option>
                                        <option value="2">{match.team2.name}</option>
                                    </select>
                                    <button className="btn btn-success" onClick={handleConfirmBet}>V</button>
                                    <button className="btn btn-danger" onClick={handleCancelBet}>X</button>
                                </>
                            ) : (
                                betPlaced.includes(match.id) ? (
                                    <div>Already bet on this match.</div>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => handleBetClick(match)}>Bet</button>
                                )
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default MatchesTable;
