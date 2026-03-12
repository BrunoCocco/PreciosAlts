// hooks/useCryptoPrices.js
import { useState, useEffect } from "react";

/*
Lista de cryptos que queremos mostrar.

La clave (BTC, ETH...) es la que usaremos en la UI.
El valor es el ID que usa CoinGecko.
*/
const COINS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  XRP: "ripple",
  HBAR: "hedera-hashgraph",
  XLM: "stellar",
  VELO: "velo",
  SHX: "stronghold-token",
};

function CryptoPrices() {
  // estado donde guardaremos todas las cryptos
  const [prices, setPrices] = useState({});

  async function fetchPrices() {
    try {
      // construimos lista de IDs para CoinGecko
      const ids = Object.values(COINS).join(",");

      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&price_change_percentage=1y`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Error API");
      }

      const data = await res.json();

      /*
      Convertimos el array que devuelve CoinGecko
      en un objeto más fácil de usar.

      Antes:
      [
        {id:"bitcoin", current_price:...}
      ]

      Después:
      {
        BTC: {price:..., change24h:...}
      }
      */

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

    // refrescar cada 20 segundos
    const interval = setInterval(fetchPrices, 20000);

    return () => clearInterval(interval);
  }, []);

  return prices;
}

export default CryptoPrices;