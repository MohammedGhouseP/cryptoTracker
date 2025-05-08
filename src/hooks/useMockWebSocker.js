import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOne } from '../features/crypto/cryptoSlice';
import { selectAllCoins } from '../features/crypto/cryptoSlice';

export default function useMockWebSocket(symbols) {
  const dispatch = useDispatch();
  const coins = useSelector(selectAllCoins);

  useEffect(() => {
    const interval = setInterval(() => {
      symbols.forEach(sym => {
        // find previous coin to build new sparkline series
        const prev = coins.find(c => c.symbol === sym);
        const newPrice = +((Math.random() * 100000).toFixed(2));
        const newChange1h = +(((Math.random() - 0.5) * 2).toFixed(2));
        const prevSeries = prev?.sparkline || Array(20).fill(prev?.price || newPrice);
        const nextSeries = [...prevSeries.slice(1), newPrice];

        dispatch(updateOne({
          symbol: sym,
          // attach new price, change, and updated sparkline series
          price: newPrice,
          change1h: newChange1h,
          sparkline: nextSeries
        }));
      });
    }, 20_000);   // every 20 seconds

    return () => clearInterval(interval);
  }, [dispatch, symbols, coins]);
}
