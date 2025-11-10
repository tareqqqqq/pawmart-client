
import { use, useEffect, useState } from "react";


import { AuthContext } from "../Auth/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyOrder = () => {
    const {user} = use(AuthContext)
       
       const [loading, setLoading] = useState(true)
         const [orders, setOrders] = useState([]);
   
       useEffect(()=> {
         if (!user?.email) return; 
       
   
           fetch(`http://localhost:3000/my-orders?email=${user.email}`)
           .then(res=> res.json())
           .then(data=> {
               
                setOrders(data)
               setLoading(false)
           })
   
       }, [user,loading])
        const downloadPDF = () => {
    const doc = new jsPDF();

    // Table columns
    const columns = [
      "Product/Listing Name",
      "Buyer Name",
      "Price",
      "Quantity",
      "Address",
      "Date",
      "Phone",
    ];

    // Table rows
    const rows = orders.map((order) => [
      order.productName,
      order.buyerName,
      order.price,
      order.quantity,
      order.address,
      order.date,
      order.phone,
    ]);

    doc.text("My Orders Report", 14, 15);
    autoTable(doc,{
      startY: 20,
      head: [columns],
      body: rows,
    });

    doc.save("my_orders_report.pdf");
  };
   
   
       if(loading) {
           return <div> Please wait ... Loading...</div>
       }
   
       return (
             <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>

      <button
        className="btn btn-primary mb-4"
        onClick={downloadPDF}
      >
        Download Report
      </button>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Buyer Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Date</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.productName}</td>
                <td>{order.buyerName}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
       );
   };
   
export default MyOrder;