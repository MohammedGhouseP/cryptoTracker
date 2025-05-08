import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAll } from './features/crypto/cryptoSlice';
import CryptoTable from './features/crypto/cyptoTable';
import useMockWebSocket from './hooks/useMockWebSocker';


const sample = [
  { symbol: 'BTC', name: 'Bitcoin', price: 93000, change1h: 0.43 },
  { symbol: 'ETH', name: 'Ethereum', price: 1800, change1h: 0.60 },
  { symbol: 'USDT', name: 'Tether', price: 1, change1h: 0 },
  { symbol: 'XRP', name: 'XRP', price: 2.22, change1h: 0.46 },
  { symbol: 'SOL', name: 'Solana', price: 150, change1h: 0.53 }
];

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(setAll(sample)); }, [dispatch]);
  useMockWebSocket(sample.map(c=>c.symbol));
  

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4 text-center">Crypto Tracker</h1>
      <CryptoTable />
    </div>
  );
}
