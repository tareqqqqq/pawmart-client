
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
       
   
           fetch(`https://paw-mart-server-self.vercel.app/my-orders?email=${user.email}`)
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
           return (
            <div className="flex items-center justify-center min-h-screen">
  <span className="loading loading-spinner loading-xl"></span>
</div>

           )
       }
   
       return (
             <div className="container m-auto p-4">
              <title>My Order</title>
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>

      <button
        className="btn btn-primary mb-4"
        onClick={downloadPDF}
      >
        Download Report
      </button>

      <div className="overflow-x-auto shadow-lg rounded-2xl">
        <table className="table w-full ">
          <thead className="bg-pink-500 text-white">
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