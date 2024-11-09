import React from 'react'

const Orders = () => {
  const orders = [
    { id: 1, product: 'Laptop', quantity: 2, status: 'Shipped' },
    { id: 2, product: 'Phone', quantity: 1, status: 'Pending' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Orders</h2>
      <table style={{ width: '100%', border: '1px solid #ddd', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders