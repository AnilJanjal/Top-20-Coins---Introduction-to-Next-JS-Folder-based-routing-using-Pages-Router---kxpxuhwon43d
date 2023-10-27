import React, { useState, useEffect } from "react";
import CoinCard from "./CoinCard";
import axios from "axios";

function CoinDisplay() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coinlore.net/api/tickers/"
        );
        setCoins(response.data.data.slice(0, 20));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <h1>Top 20 Cryptos</h1>
      <div className="coins-container">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}

export default CoinDisplay;

