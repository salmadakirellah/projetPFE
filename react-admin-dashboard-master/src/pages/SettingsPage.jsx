import React, { useEffect, useState } from "react";
import axios from "axios";

function SettingsPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/order")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Erreur chargement commandes", err));
  }, []);

  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📦 Liste des Commandes</h1>
      {orders.map((order, idx) => (
        <div key={idx} style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>SKU</th>
                <th style={styles.th}>Quantité</th>
                <th style={styles.th}>Prix</th>
              </tr>
            </thead>
            <tbody>
              {order.orderLineItemsList.map((item, i) => (
                <tr key={i}>
                  <td style={styles.td}>{item.skuCode}</td>
                  <td style={styles.td}>{item.quantity}</td>
                  <td style={styles.td}>{item.price.toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.total}>
            Total: <strong>{calculateTotal(order.orderLineItemsList)} €</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f5f5f5",  // Light background color
    minHeight: "100vh",
    color: "#333",  // Dark text color for good contrast
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#1e88e5",  // Light blue color for title
    fontSize: "2rem",
  },
  card: {
    backgroundColor: "#ffffff",  // White card background
    borderRadius: "10px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",  // Lighter shadow for a soft effect
  },
  orderNumber: {
    marginBottom: "1rem",
    color: "#1976d2",  // Blue color for order number
    fontSize: "1.2rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
  },
  th: {
    backgroundColor: "#f1f1f1",  // Light gray background for header
    padding: "0.75rem",
    color: "#333",  // Dark text color
    borderBottom: "1px solid #ddd",  // Light border for a clean separation
    textAlign: "left",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #ddd",  // Light gray border for table rows
    color: "#555",  // Darker text for readability
  },
  total: {
    textAlign: "right",
    fontSize: "1.1rem",
    color: "#1e88e5",  // Light blue color for total
    marginTop: "1rem",
  },
};

export default SettingsPage;
