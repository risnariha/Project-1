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
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-10'>
          <div className='p-4 shadow bg-chart pie rounded'>
            <Pie data={data} options={options} width={400} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieChart;
