import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserActivityHeatmap = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8082/api/inventory/all')
      .then(response => setInventoryItems(response.data))
      .catch(err => console.error('Erreur chargement inventory', err));
  }, []);

  useEffect(() => {
    const totalValue = orderItems.reduce((sum, item) => sum + item.quantity * item.prix, 0);
    setTotal(totalValue);
  }, [orderItems]);

  const handleAddItem = () => {
    setOrderItems([...orderItems, { skuCode: '', quantity: 1, prix: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...orderItems];
    if (field === 'skuCode') {
      const selectedProduct = inventoryItems.find(i => i.skuCode === value);
      updatedItems[index].skuCode = value;
      updatedItems[index].prix = selectedProduct?.prix || 0; // Le champ est `price` côté inventaire
    } else {
      updatedItems[index][field] = parseInt(value);
    }
    setOrderItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderPayload = {
      orderLineItemsDtoList: orderItems.map(item => ({
        skuCode: item.skuCode,
        quantity: item.quantity,
        price: item.prix, // Envoie en tant que `prix`
      }))
    };

    axios.post('http://localhost:8081/api/order', orderPayload)
      .then(res => {
        setMessage(res.data || "✅ Commande envoyée avec succès !");
        setOrderItems([]);
      })
      .catch(err => {
        console.error(err);
        setMessage("❌ Erreur lors de l'envoi de la commande.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white text-gray-800 shadow-lg rounded-xl border border-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🛒 Passer une commande</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {orderItems.map((item, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 items-center">
            <select
              className="bg-white border border-gray-300 p-2 rounded text-gray-800 focus:ring-2 focus:ring-blue-400"
              value={item.skuCode}
              onChange={(e) => handleItemChange(index, 'skuCode', e.target.value)}
              required
            >
              <option value="">-- Produit --</option>
              {inventoryItems.map((prod) => (
                <option key={prod.id} value={prod.skuCode}>
                  {prod.skuCode}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              className="bg-white border border-gray-300 p-2 rounded text-gray-800 focus:ring-2 focus:ring-blue-400"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              required
            />

            <input
              type="number"
              disabled
              className="bg-gray-100 border border-gray-300 p-2 rounded text-center text-gray-800"
              value={item.prix}
            />

            <div className="text-lg text-gray-800 font-medium">
              {(item.quantity * item.prix).toFixed(2)} €
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddItem}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm"
          >
            + Ajouter un article
          </button>

          <div className="text-xl font-bold text-green-500">
            Total : {total.toFixed(2)} €
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded mt-4 shadow-md"
        >
          ✅ Confirmer la commande
        </button>

        {message && (
          <div className="mt-4 text-center text-lg font-semibold text-yellow-500">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UserActivityHeatmap;
