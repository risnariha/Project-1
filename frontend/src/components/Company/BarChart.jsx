import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Barchart',
    },
  },
};

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'April', 'May'],
  datasets: [
    {
      label: 'Present',
      data: [52, 34, 57, 60, 85], // Adjusted to match the number of labels
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Absent',
      data: [40, 100, 32, 80, 90], // Adjusted to match the number of labels
      backgroundColor: 'rgba(245, 99, 232, 0.5)',
    },
  ],
};

function BarChart() {
  return (
    
      <div className="row justify-content-center">
        
          
      <Bar data={data} options={options} />
          
        
      
    </div>
  );
}

export default BarChart;
