import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const menuItems = [
  { id: 1, name: "Paneer Butter Masala", price: 250, image: `${API_BASE_URL}//images/paneer.jpg` },
  { id: 2, name: "Dal Makhani", price: 200, image: `${API_BASE_URL}/images/dal_makhni.jpg` },
  { id: 3, name: "Aloo Paratha", price: 150, image: `${API_BASE_URL}/images/aloo_paratha.jpg` },
  { id: 4, name: "Veg Biryani", price: 300, image: `${API_BASE_URL}/images/biryani.jpg` },
];

function Menu() {
  

  const generateInvoice = (item, transactionId) => {
    const invoiceWindow = window.open("", "_blank");
    const invoiceContent = `
      <html>
        <head>
          <title>Order Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            .invoice-container { width: 60%; margin: auto; padding: 20px; border: 1px solid #ddd; }
            h1 { color: #333; }
            .invoice-details { text-align: left; }
            button { padding: 10px 20px; margin-top: 20px; font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <h1>Order Invoice</h1>
            <p><strong>Order ID:</strong> ${Math.floor(Math.random() * 100000)}</p>
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
            <p><strong>Item:</strong> ${item.name}</p>
            <p><strong>Amount Paid:</strong> ₹${item.price}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <button onclick="window.print()">Print Invoice</button>
          </div>
        </body>
      </html>
    `;
    invoiceWindow.document.write(invoiceContent);
    invoiceWindow.document.close();
  };
  

  const navigate = useNavigate();

  const handlePlaceOrder = async (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/payment/create`, {
        amount: item.price, // Pass item price
        currency: "INR",
      });

      const order = response.data;

      // Open Razorpay Payment UI
      const options = {
        key: process.env.RAZORPAY_KEY, // Replace with Razorpay key
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Rasoi Bite",
        description: `Payment for ${item.name}`,
        handler: function (response) {
          alert("Payment Successful! Transaction ID: " + response.razorpay_payment_id);
          generateInvoice(item, response.razorpay_payment_id);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="menu-section text-center">
      <h1>Our Menu</h1>
      <p>Explore our delicious homemade meal options.</p>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={item.image} alt={item.name} />
            <div className="menu-info">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
               {/* <button className="btn-primary" onClick={() => handlePlaceOrder(item)}>  */}
              <button className="btn-primary" onClick={() => alert("Currently Unable to Place Order")}>
                Place Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
