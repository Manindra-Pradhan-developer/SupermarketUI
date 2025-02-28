import { useState } from 'react';
import api from '../../services/api';

function Sales() {
  const [cartItems, setCartItems] = useState([]);
  const [productIdInput, setProductIdInput] = useState('');

  const addProductToCart = () => {
    api.get(`/products/${productIdInput}`).then((response) => {
      const product = response.data;
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      setProductIdInput('');
    });
  };

  const handleCheckout = () => {
    const sale = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };
    api.post('/sales', sale).then(() => {
      setCartItems([]);
      alert('Sale completed successfully!');
    });
  };

  return (
    <div>
      <h2>Create a Bill</h2>
      <input
        placeholder="Enter Product ID"
        value={productIdInput}
        onChange={(e) => setProductIdInput(e.target.value)}
      />
      <button onClick={addProductToCart}>Add to Cart</button>

      <h3>Cart</h3>
      <ul>
        {cartItems.map((item, idx) => (
          <li key={idx}>
            {item.name} - {item.price} x {item.quantity}
          </li>
        ))}
      </ul>

      <button onClick={handleCheckout}>Complete Sale</button>
    </div>
  );
}

export default Sales;
