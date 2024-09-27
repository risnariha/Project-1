import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Legend,
  Tooltip,
  Title
);






function Piechart() {


const [pendingcount, setPendingcount] = useState(0);
const [deliverycount, setDeliverycount] = useState(0);

useEffect(()=>{
  count();
},[]);

const count =async() =>{
   try {
    const response = await axios.post('http://localhost:8080/backend/api/Admin/chart.php');
    const jsonData = response.data;
    setPendingcount(jsonData.pending);
    setDeliverycount(jsonData.delivery);
    console.log(pendingcount);
    console.log(deliverycount);
    
  } catch (error) {
    console.error('Error  order details count:', error);
  }
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const data = {
  labels: [ 'Completed', 'Pending'],
  datasets: [
    {
      label: 'Order',
      data: [{pendingcount}, {deliverycount}],
      backgroundColor: [
        '#219ebc',
        '#8ecae6',
        
      ],
      borderColor: [
        'rgba(25, 99, 132, 5)',
        'rgba(165, 19, 152, 0.5)',
        
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    // <div >
    <div className='d-flex' style={{width:'60%', marginLeft:'16%'}}>
      <Pie data={data} options={options} />
     
    </div>
  );
}

export default Piechart;
