import React, { useState } from 'react';
import { dummySaleOrders } from '../dummyData';
import OrderModal from './OrderModel';

const CompletedOrders = () => {
  const [orders, setOrders] = useState(dummySaleOrders.filter(order => order.paid));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div>
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
                <button onClick={() => handleViewOrder(order)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={currentOrder}
        readOnly
      />
    </div>
  );
};

export default CompletedOrders;
