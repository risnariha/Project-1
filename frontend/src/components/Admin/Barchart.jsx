import 'bootstrap/dist/css/bootstrap.min.css';
{/*import necessary modules*/}
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';


{/*react chart.js components---
  Registers the components from chart.js that you will use in your charts. 
  This is necessary to use chart.js within React.*/}
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
{/*Chart Configuration (options):*/}
const options = {
  responsive:true,
  plugins:{
    legend:{
      position:'bottom'
    },
    title:{
      display:true,
      text:'Number of Products in company'
    }
  }
}
{/*x-axis--label*/}
{/* An array of datasets to be displayed in the bar chart--datasets*/}
const data = {
  labels: ['Washing Items', 'Milk Item', 'Drinks Item', 'Flour', 'Chocolates', 'Biscuits'],
  datasets: [
    {
      label: 'Company',
      data: [12, 10, 20, 30, 10, 40],
      backgroundColor: 'rgba(105, 59, 202, 0.85)',
      borderWidth: 1
    }]
  }

  
    
   


function Barchart() {
  return (
    
    <div className='d-flex  justify-content-center w-100'>
      <Bar options ={options} data ={data} />
     
      
    </div>
  )
}

export default Barchart