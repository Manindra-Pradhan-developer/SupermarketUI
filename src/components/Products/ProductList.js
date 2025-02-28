import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <Link to="/dashboard/products/add">Add New Product</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Batch Number</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.batchNumber}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
