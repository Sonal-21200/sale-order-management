import React, { useState } from 'react';
import { dummySaleOrders } from '../dummyData';
import OrderModal from './OrderModel';

const ActiveOrders = () => {
  const [orders, setOrders] = useState(dummySaleOrders.filter(order => !order.paid));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleAddOrder = () => {
    setCurrentOrder(null);
    setIsModalOpen(true);
  };

  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleSaveOrder = (order) => {
    if (currentOrder) {
      // Update existing order
      setOrders((prev) => prev.map((o) => (o.id === currentOrder.id ? order : o)));
    } else {
      // Add new order
      setOrders((prev) => [...prev, { ...order, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleAddOrder}>+ Sale Order</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{order.invoice_date}</td>
              <td>
                <button onClick={() => handleEditOrder(order)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={currentOrder}
        onSave={handleSaveOrder}
      />
    </div>
  );
};

export default ActiveOrders;
