import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [product, setProduct] = useState({ name: '', category: '', batchNumber: '', price: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/products', product).then(() => {
      navigate('/dashboard/products');
    });
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" onChange={handleChange} required />
        <input name="category" placeholder="Category" onChange={handleChange} required />
        <input name="batchNumber" placeholder="Batch Number" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;