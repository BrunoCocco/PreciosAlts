import CryptoPrices from "../hooks/CryptoPrice";

function Cotizacion() {
  const prices = CryptoPrices();

  const icons = {
    BTC: "₿",
    ETH: "Ξ",
    XRP: "✕",
    HBAR: "⏣",
    XLM: "✦",
    VELO: "V",
    SHX: "S",
  };

  // convertir objeto → array
  const sortedCoins = Object.entries(prices)
    .sort((a, b) => b[1].marketCap - a[1].marketCap);

  return (
    <>
      <h1>
        <code>
          Pe<u>rseveran</u>cia !!
        </code>
      </h1>

      {sortedCoins.map(([symbol, coin]) => {
        const up24 = coin.change24h >= 0;
        const up1y = coin.change1y >= 0;

        const arrow24 = up24 ? "▲" : "▼";
        const arrow1y = up1y ? "▲" : "▼";

        const color24 = up24 ? "green" : "red";
        const color1y = up1y ? "green" : "red";

        return (
          <div key={symbol} style={{ marginBottom: "12px" }}>
            <h3>
              {icons[symbol]} {symbol}: ${coin.price?.toLocaleString()}
            </h3>

            <p>
              <span style={{ color: color24 }}>
                {arrow24} {coin.change24h?.toFixed(2)}%
              </span>
              {" | "}
              <span style={{ color: color1y }}>
                {arrow1y} {coin.change1y?.toFixed(2)}%
              </span>
            </p>
          </div>
        );
      })}
    </>
  );
}

export default Cotizacion;