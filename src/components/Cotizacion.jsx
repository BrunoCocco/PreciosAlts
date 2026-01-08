// Cotizacion.jsx
import usePrice from "../hooks/CryptoPrice";

function Cotizacion() {
  const btc = usePrice("BTC");
  const eth = usePrice("ETH");
  const xrp = usePrice("XRP");
  const hbar = usePrice("HBAR");
  const xlm = usePrice("XLM");
  const velo = usePrice("VELO"); // ✅ ahora trae Velo Protocol vía CoinGecko
  const shx = usePrice("SHX");   // ✅ Stronghold (SHX)

  return (
    <>
      <div>
        <h1>
          <code>
            pe<u>rseveran</u>cia !!
          </code>
        </h1>
      </div>

      <h3>₿ | Bitcoin: {btc ? `$${btc}` : "Cargando..."}</h3>
      <h3>Ξ | Ethereum: {eth ? `$${eth}` : "Cargando..."}</h3>
      <h3>✕ | Ripple: {xrp ? `$${xrp}` : "Cargando..."}</h3>
      <h3>⏣ | Hedera: {hbar ? `$${hbar}` : "Cargando..."}</h3>
      <h3>✦ | Stellar: {xlm ? `$${xlm}` : "Cargando..."}</h3>

      <h3>V | Velo: {velo ? `$${velo}` : "Cargando..."}</h3>

      <p className="read-the-docs">
        El poder está en tu determinación, no en la perfección.
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
