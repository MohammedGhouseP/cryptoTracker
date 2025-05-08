// src/features/crypto/Sparkline.js
import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function Sparkline({ data = [], direction }) {
  const chartRef = useRef(null);

  const labels = data.map((_, i) => i);
  const cfg = {
    data: {
      labels,
      datasets: [{
        data,
        borderColor: direction === 'text-green-600' ? '#16a34a' : '#dc2626',
        borderWidth: 2,
        pointRadius: 0,
      }],
    },
    options: {
      animation: { duration: 0 },
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false, type: 'category' },
        y: { display: false },
      },
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    chart.data.datasets[0].data = data;
    chart.data.labels = labels;
    chart.update('none');
  }, [data, labels]);

  return <Line {...cfg} ref={chartRef} />;
}
