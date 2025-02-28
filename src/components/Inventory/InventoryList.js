import { useState, useEffect } from 'react';
import api from '../../services/api';

function InventoryList() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    api.get('/inventory').then((response) => {
      setInventory(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Inventory Levels</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.productId}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;
