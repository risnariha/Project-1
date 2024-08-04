import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend, Tooltip, Title } from 'chart.js';

ChartJS.register(ArcElement, Legend, Tooltip, Title);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Piechart',
    },
  },
};

const data = {
  labels: ['In Progress', 'Completed', 'To Do'],
  datasets: [
    {
      label: 'Assignment Completion',
      data: [10, 20, 30],
      backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(235, 29, 152, 0.5)', 'rgba(225, 49, 172, 0.5)'],
      borderColor: ['rgba(245, 99, 132, 0.5)', 'rgba(225, 29, 152, 0.5)', 'rgba(235, 79, 192, 0.5)'],
      borderWidth: 1,
    },
  ],
};

function PieChart() {
  return (
    
      <div className='d-flex justify-content-center'>
        
          
            <Pie data={data} options={options} style={{width:'60%'}} />
          
        </div>
      
    
  );
}

export default PieChart;
