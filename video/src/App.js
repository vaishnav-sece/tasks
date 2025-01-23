import React, { useState, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

const fakeApi = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Phone' },
  { id: 3, name: 'Tablet' },
  { id: 4, name: 'Headphones' },
  { id: 5, name: 'Keyboard' },
  { id: 6, name: 'Mouse' },
  { id: 7, name: 'Monitor' },
  { id: 8, name: 'Smart Watch' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return fakeApi.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setSelectedProduct(null); 
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Router>
      <div className="App">
        {}
       
        {}
        <div className="cart-button-container">
          <Link to="/cart">
            <button className="cart-button">Cart ({cart.length})</button>
          </Link>
        </div>

        <Routes>
          {}
          <Route
            path="/"
            element={
              <div>
                <h1>Product List</h1>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                />
                <button onClick={clearSearch}>Clear Search</button>

                <div>
                  <h2>Filtered Products ({filteredProducts.length})</h2>
                  <ul>
                    {filteredProducts.map((product) => (
                      <li key={product.id} onClick={() => handleProductClick(product)}>
                        {product.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {}
                {selectedProduct && (
                  <div>
                    <h3>Selected: {selectedProduct.name}</h3>
                    <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
                  </div>
                )}
              </div>
            }
          />

          {}
          <Route
            path="/cart"
            element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function CartPage({ cart, removeFromCart }) {
  return (
    <div className="cart-container">
      <h2>Cart ({cart.length})</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              {product.name}
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default App;
