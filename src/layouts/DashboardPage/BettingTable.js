import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cookies from "universal-cookie";

function BettingTable(props) {
    const cookies = new Cookies();

    useEffect(() => {
        fetchMyBetting();
    }, []);

    const [myBetting, setMyBetting] = useState([]);

    const fetchMyBetting = () => {
        axios
            .get("http://localhost:8080/get-betting", {
                params: {
                    secret: cookies.get("secret")
                }
            })
            .then((response) => {
                setMyBetting(response.data);
            })
            .catch((error) => {
                console.error("Error fetching my betting data:", error);
            });
    };

    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Num</th>
                    <th>Date</th>
                    <th>Home Team</th>
                    <th>Visiting Team</th>
                    <th>Sum</th>
                    <th>Winner</th>
                    <th>winning amount</th>
                </tr>
                </thead>
                <tbody>
                {myBetting.map((bet, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{bet.match.date}</td>
                        <td>{bet.match.team1.name}</td>
                        <td>{bet.match.team2.name}</td>
                        <td>{bet.sumOfBet}</td>
                        <td>{bet.result}</td>
                        <td>{(bet.sumOfBet*bet.winRatio).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BettingTable;
