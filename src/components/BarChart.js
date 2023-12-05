import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ averageEmissions, userEmissions }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Average Footprint', 'Your Footprint'],
          datasets: [
            {
              label: 'CO2 Emissions',
              data: [averageEmissions, userEmissions],
              backgroundColor: [
                'blue', 
                userEmissions < averageEmissions ? 'green' : 'red', 
              ],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false, 
              },
            },
            x: {
              grid: {
                display: false, 
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [averageEmissions, userEmissions]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
