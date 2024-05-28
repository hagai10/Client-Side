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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {myBetting.map((bet, index) => (
                    <tr key={index}>
                        <td>{bet.id}</td>
                        <td>{bet.name}</td>
                        <td>{bet.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BettingTable;
