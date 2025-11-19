// import { useState } from "react";
// import usePrice from "../hooks/CryptoPrice";

function Conver() {
  //   const [montoEnEuros, setEuros] = (useState = "0");
  return (
    <section>
      <article>
        <form action="GET">
          <h2>Convertor</h2>
          <label htmlFor="eurosInput">Euros (€)</label>

          <input type="number" id="eurosInput" placeholder="Ingresá un monto" />

          <label htmlFor="criptoSelect">Elegir cripto</label>

          <select id="criptoSelect">
        {/* 
            🔽 Cada <option> representa una cripto disponible.
            El "value" que tenga cada una se conecta con la lógica de conversión.
            
            Ejemplo mental:
            si value="btc" → usar precioBTC traído por la API
            si value="eth" → usar precioETH traído por la API
            si value="xrp" → usar precioXRP
            etc.

            Esto permite que la lógica interna funcione con una sola fórmula,
            simplemente cambiando el precio de referencia según la opción elegida.
        */}
            <option value="btc">Bitcoin (BTC)</option>
            <option value="eth">Ethereum (ETH)</option>
            <option value="xrp">Ripple (XRP)</option>
            <option value="hbar">Hedera (HBAR)</option>
            <option value="xlm">Stellar (XLM)</option>
          </select>
          <button>calcular</button>
        </form>
      </article>
    </section>
  );
}

export default Conver;
