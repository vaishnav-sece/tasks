import React, { useState, useMemo, useCallback } from 'react';
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

 
  const filteredProducts = useMemo(() => {
    return fakeApi.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  
  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return (
    <div className="App">
      <h1>Product List</h1>

      {}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      
      {}
      <button onClick={clearSearch}>Clear Search</button>

      {}
      <div>
        <h2>Filtered Products ({filteredProducts.length})</h2>
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
