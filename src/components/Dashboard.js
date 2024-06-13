import React from 'react';
import { Routes, Route, NavLink, useMatch } from 'react-router-dom';
import ActiveOrders from './ActiveOrders';
import CompletedOrders from './CompletedOrders';

const Dashboard = ({ toggleTheme }) => {
  let match = useMatch('/dashboard/*');

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <nav>
        <ul>
          <li>
            <NavLink to={`${match.url}/active-orders`} activeClassName="active">Active Orders</NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/completed-orders`} activeClassName="active">Completed Orders</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="active-orders" element={<ActiveOrders />} />
        <Route path="completed-orders" element={<CompletedOrders />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
