// hooks/useCryptoPrices.js
import { useState, useEffect } from "react";

const COINS = {
  BTC: "bitcoin",
  XRP: "ripple",
  HBAR: "hedera-hashgraph",
  XLM: "stellar",
  VELO: "velo",
  SHX: "stronghold-token",
};

function CryptoPrices() {
  const [prices, setPrices] = useState({});

  async function fetchPrices() {
    try {
      const ids = Object.values(COINS).join(",");

      const url =
        `https://api.coingecko.com/api/v3/coins/markets` +
        `?vs_currency=usd&ids=${ids}&price_change_percentage=1y`;

      const res = await fetch(url);
      const data = await res.json();

      const result = {};

      data.forEach((coin) => {
        const symbol = Object.keys(COINS).find(
          (key) => COINS[key] === coin.id
        );

        if (symbol) {
          result[symbol] = {
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h,
            change1y: coin.price_change_percentage_1y_in_currency,
            marketCap: coin.market_cap, // 👈 nuevo
          };
        }
      });

      setPrices(result);
    } catch (err) {
      console.error("Error obteniendo precios:", err);
    }
  }

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 20000);
    return () => clearInterval(interval);
  }, []);

  return prices;
}

export default CryptoPrices;