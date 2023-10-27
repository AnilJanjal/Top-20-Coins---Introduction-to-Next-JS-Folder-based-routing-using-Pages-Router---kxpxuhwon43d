import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function CoinDetail() {
  const router = useRouter();
  const { coin_id } = router.query;
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coinlore.net/api/ticker/?id=${coin_id}`
        );
        setCoin(response.data[0]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (coin_id) {
      fetchData();
    }
  }, [coin_id]);

  return (
    <div className="coin-detail">
      {coin && (
        <div className="name-symbol">
          <h1 className="name">{coin.name}</h1>
          <h2 className="symbol">({coin.symbol})</h2>
        </div>
      )}
      {coin && (
        <div className="market-description">
          <p className="coin-rank">Rank: {coin.rank}</p>
          <p className="coin-price">Price: ${coin.price_usd}</p>
          <p className="coin-market-cap">
            Market Cap: ${coin.market_cap_usd}
          </p>
          <p className="coin-total-supply">Total Supply: {coin.tsupply}</p>
          <p className="coin-max-supply">
            Max Supply: {coin.msupply ? coin.msupply : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}

export default CoinDetail;

