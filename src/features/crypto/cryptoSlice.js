import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const adapter = createEntityAdapter({ selectId: coin => coin.symbol });
const initial = adapter.getInitialState();

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: initial,
  reducers: {
    setAll: adapter.setAll,
    updateOne: adapter.upsertOne
  }
});

export const { setAll, updateOne } = cryptoSlice.actions;
export default cryptoSlice.reducer;
export const {
  selectAll: selectAllCoins,
  selectById: selectCoinBySymbol
} = adapter.getSelectors(state => state.crypto);