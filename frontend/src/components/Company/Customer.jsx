

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Customer = () => {
  const [records, setRecords] = useState([
    {
      fname: "John",
      lname: "Doe",
      email: "john.doe@example.com",
      district: "Jaffna",
      refno: "001",
    },
    {
      fname: "Jane",
      lname: "Smith",
      email: "jane.smith@example.com",
      district: "Jaffna",
      refno: "002",
    },
    {
      fname: "Emily",
      lname: "Johnson",
      email: "emily.johnson@example.com",
      district: "Jaffna",
      refno: "003",
    },
    {
      fname: "Michael",
      lname: "Brown",
      email: "michael.brown@example.com",
      district: "Jaffna",
      refno: "004",
    },
    {
      fname: "Sarah",
      lname: "Davis",
      email: "sarah.davis@example.com",
      district: "Jaffna",
      refno: "005",
    },
  ]);

  const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost/Project-1/backend/api/Company/customer.php")
  //     .then((response) => {
  //       if (Array.isArray(response.data)) {
  //         setProducts(response.data);
  //       } else {
  //         setError("Invalid response format");
  //         console.error("Invalid response format:", response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       setError("Error fetching products");
  //       console.error("Error fetching products:", error);
  //     });
  // }, []);

  // const handleDelete = (customer_id) => {
  //   if (window.confirm("Are you sure you want to delete customer?")) {
  //     axios
  //       .get(
  //         `http://localhost/Project-1/backend/api/Company/delete_customer.php?delete=${customer_id}`
  //       )
  //       .then((response) => {
  //         if (response.data.success) {
  //           setRecords(
  //             products.filter((customer) => customer.customer_id !== customer_id)
  //           );
  //         } else {
  //           console.error("Error deleting customer:", response.data.error);
  //         }
  //       })
  //       .catch((error) => console.error("Error deleting customer:", error));
  //   }
  // };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="maincontainer">
      <div className="table_heading">
        <h3>Customer Details</h3>
        </div>
      <section className="display_product">
        {/* {customer.length > 0 ? ( */}
          <table>
            <thead>
              <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Reference No</th>
              <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
              {records.map((item) => (
                <tr key={item.refno}>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                  <td>{item.district}</td>
                  <td>{item.refno}</td>

                  <td>
                         <button className="btn btn-success m-2">View</button>
                         <button className="btn btn-danger">Delete</button>  
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          {/* <div className="empty_text">No Customer Available</div> */}
        )
        {/* } */}
      </section>
    </div>
  );
};

export default Customer;
