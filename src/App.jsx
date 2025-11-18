import viteLogo from "/vite.svg";
import usePrice from "./hooks/CryptoPrice";

import "./App.css";

function App() {
  const btc = usePrice("BTC");
  const eth = usePrice("ETH");
  const xrp = usePrice("XRP");
  const hbar = usePrice("HBAR");
  const xlm = usePrice("XLM");

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <p>🟡 Bitcoin: {btc ? `$${btc}` : "Cargando..."}</p>
      <p>Ethereum: {eth ? `$${eth}` : "Cargando..."}</p>
      <p>Ripple: {xrp ? `$${xrp}` : "Cargando..."}</p>
      <p>Hedera: {hbar ? `$${hbar}` : "Cargando..."}</p>
      <p>Stellar lummens: {xlm ? `$${xlm}` : "Cargando..."}</p>
      <p className="read-the-docs">
        Solo a titulo informativo, contiene un delay de 20" no es aconsejable
        operar siguendo estos indices de precios.
      </p>
    </>
  );
}

export default App;
