// ../hooks/CryptoPrice.js
import { useState, useEffect, useCallback } from "react";

const COINGECKO_IDS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  XRP: "ripple",
  HBAR: "hedera-hashgraph",
  XLM: "stellar",
  VELO: "velo", // ✅ Velo Protocol (no confundir con Velodrome)
};

function formatUsd(value) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return null;
  return n.toLocaleString("en-US");
}

async function fetchFromCoinbase(symbol) {
  const res = await fetch(`https://api.coinbase.com/v2/prices/${symbol}-USD/spot`);
  if (!res.ok) throw new Error(`Coinbase HTTP ${res.status}`);
  const data = await res.json();
  const amount = data?.data?.amount;
  const formatted = formatUsd(amount);
  if (!formatted) throw new Error("Coinbase: amount inválido");
  return formatted;
}

async function fetchFromCoinGecko(symbol) {
  const id = COINGECKO_IDS[symbol];
  if (!id) throw new Error("CoinGecko: id no mapeado");
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
      id
    )}&vs_currencies=usd`
  );
  if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);
  const data = await res.json();
  const usd = data?.[id]?.usd;
  const formatted = formatUsd(usd);
  if (!formatted) throw new Error("CoinGecko: usd inválido");
  return formatted;
}

function usePrice(symbol = "BTC") {
  const [precio, setPrecio] = useState(null);

  const fetchPrecio = useCallback(async () => {
    const sym = String(symbol || "BTC").toUpperCase();

    try {
      // VELO: forzamos CoinGecko para asegurar "Velo Protocol"
      if (sym === "VELO") {
        setPrecio(await fetchFromCoinGecko(sym));
        return;
      }

      // Primero Coinbase
      setPrecio(await fetchFromCoinbase(sym));
    } catch (err) {
      // Fallback a CoinGecko si tenemos mapeo
      try {
        if (COINGECKO_IDS[sym]) {
          setPrecio(await fetchFromCoinGecko(sym));
          return;
        }
      } catch (fallbackErr) {
        console.error(`❌ Error obteniendo precio de ${sym}:`, fallbackErr);
        return;
      }

      console.error(`❌ Error obteniendo precio de ${sym}:`, err);
    }
  }, [symbol]);

  useEffect(() => {
    fetchPrecio();
    const interval = setInterval(fetchPrecio, 20000);
    return () => clearInterval(interval);
  }, [fetchPrecio]);

  return precio;
}

export default usePrice;
