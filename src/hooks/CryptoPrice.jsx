import { useState, useEffect, useCallback } from "react";

 function usePrice(symbol = "BTC") {
  const [precio, setPrecio] = useState(null);

  const fetchPrecio = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.coinbase.com/v2/prices/${symbol}-USD/spot`
      );
      const data = await res.json();
      setPrecio(Number(data.data.amount).toLocaleString("en-US"));
    } catch (error) {
      console.error(`❌ Error obteniendo precio de ${symbol}:`, error);
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