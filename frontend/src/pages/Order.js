import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(userId);

  useEffect(() => {
    
    axios
      .get(`${API_BASE_URL}/api/orders/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="order-container">
      <Card className="order-card">
        <Card.Body>
          <h1 className="order-title">Your Orders</h1>

          {loading ? (
            <Spinner animation="border" className="order-spinner" />
          ) : orders.length === 0 ? (
            <p className="order-empty">No orders found. Start by placing a new order!</p>
          ) : (
            <Table responsive bordered hover className="order-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>#{order.id}</td>
                    <td>{order.items}</td>
                    <td className={`status-${order.status.toLowerCase()}`}>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Button variant="success" className="order-button" onClick={() => navigate("/menu")}>
            Order a Meal 🍽️
          </Button>
        </Card.Body>
      </Card>

      <style>{`
        .order-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          padding: 20px;
        }
        
        .order-card {
          width: 90%;
          max-width: 800px;
          background: white;
          border-radius: 12px;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
          padding: 20px;
          text-align: center;
        }
        
        .order-title {
          font-size: 2.2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }
        
        .order-spinner {
          margin-top: 20px;
        }
        
        .order-empty {
          font-size: 1.2rem;
          color: #777;
          margin-top: 20px;
          font-style: italic;
        }
        
        .order-table {
          margin-top: 15px;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }
        
        .order-button {
          width: 100%;
          padding: 12px;
          font-size: 1.2rem;
          margin-top: 20px;
          background: #ff5733;
          border: none;
          border-radius: 8px;
          transition: background 0.3s;
        }

        .order-button:hover {
          background: #e64a19;
        }

        .status-pending {
          color: orange;
          font-weight: bold;
        }
        
        .status-delivered {
          color: green;
          font-weight: bold;
        }
        
        .status-cancelled {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </Container>
  );
}

export default Order;
