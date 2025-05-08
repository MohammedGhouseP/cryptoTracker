import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllCoins } from "./cryptoSlice";
import Sparkline from "./sparkLine";

export default function CryptoTable() {
  const coins = useSelector(selectAllCoins);

  const rows = useMemo(() => {
    return coins.map((c, i) => {
      const last = c.lastPrice ?? c.price;
      const priceUp = c.price >= last;
      return {
        ...c,
        idx: i + 1,
        priceColor: priceUp ? "text-green-600" : "text-red-600",
        changeColor: c.change1h >= 0 ? "text-green-600" : "text-red-600",
        spark: c.sparkline, 
        lastPrice: c.price, 
      };
    });
  }, [coins]);

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="min-w-full table-fixed text-md">
        <colgroup>
          <col style={{ width: "40px" }} />
          <col />
          <col style={{ width: "100px" }} />
          <col style={{ width: "80px" }} />
          
          <col style={{ width: "140px" }} />
        </colgroup>
        <thead className="bg-gray-100  uppercase text-gray-600">
          <tr>
            <th className="py-2 px-1">#</th>
            <th className="py-2 text-left">Name</th>
            <th className="py-2 px-1">Price</th>
            <th className="py-2 px-1">1h %</th>
            <th className="py-2 px-2">7d Chart</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.symbol} className="odd:bg-white  even:bg-gray-50">
              <td className="text-center">{c.idx}</td>
              <td>
                {c.name}
                <span className="text-gray-500 "> ({c.symbol})</span>
              </td>
              <td className={`${c.priceColor} text-right`}>
                ${c.price.toLocaleString()}
              </td>
              <td className={`${c.changeColor} text-right `}>{c.change1h}%</td>
              <td className="py-1 px-10">
                <div className="w-48 h-10">
                  <Sparkline data={c.sparkline} direction={c.priceColor} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
