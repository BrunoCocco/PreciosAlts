import CryptoPrices from "../hooks/CryptoPrice";

function Cotizacion() {
  const prices = CryptoPrices();

  // iconos solo para estética
  const icons = {
    BTC: "₿",
    ETH: "Ξ",
    XRP: "✕",
    HBAR: "⏣",
    XLM: "✦",
    VELO: "V",
    SHX: "S",
  };

  return (
    <>
      <h1>
        <code>
          Pe<u>rseveran</u>cia !!
        </code>
      </h1>

      {/* recorremos todas las cryptos automáticamente */}
      {Object.entries(prices).map(([symbol, coin]) => {
        const color24h = coin.change24h >= 0 ? "green" : "red";
        const color1y = coin.change1y >= 0 ? "green" : "red";

        return (
          <div key={symbol} style={{ marginBottom: "15px" }}>
            <h3>
              {icons[symbol]} {symbol} : ${coin.price?.toLocaleString()}
            </h3>

            <p>
              24h:{" "}
              <span style={{ color: color24h }}>
                {coin.change24h?.toFixed(2)}%
              </span>{" "}
              | 1y:{" "}
              <span style={{ color: color1y }}>
                {coin.change1y?.toFixed(2)}%
              </span>
            </p>
          </div>
        );
      })}

      <p className="read-the-docs">
        El poder está <b>en tu determinación</b>, no en la perfección.
      </p>

      <p>
        <code>
          Disc<u>iplina</u>
        </code>
        (r)
      </p>
    </>
  );
}

export default Cotizacion;