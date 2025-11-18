import usePrice from "../hooks/CryptoPrice";

function Cotizacion() {
  const btc = usePrice("BTC");
  const eth = usePrice("ETH");
  const xrp = usePrice("XRP")
  const hbar = usePrice("HBAR");
  const xlm = usePrice("XLM");

  return (
    <>
      <div>
        <h1><code>CoinMarket Truck </code></h1>
      </div>
      <h3>₿ | Bitcoin: {btc ? `$${btc}` : "Cargando..."}</h3>
      <h3>Ξ | Ethereum: {eth ? `$${eth}` : "Cargando..."}</h3>
      <h3>✕ | Ripple: {xrp ? `$${xrp}` : "Cargando..."}</h3>
      <h3>⏣ | Hedera: {hbar ? `$${hbar}` : "Cargando..."}</h3>
      <h3>✦ | Stellar: {xlm ? `$${xlm}` : "Cargando..."}</h3>
      <p className="read-the-docs">
        Solo a titulo informativo, contiene un delay de 20" no es aconsejable
        operar siguendo estos indices de precios.
      </p>
    </>
  );
}

export default Cotizacion;