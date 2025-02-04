import React, { useState, useEffect } from 'react';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [soldOutIds, setSoldOutIds] = useState([]);

  // Fetch plants on mount
  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  // Add new plant
  const handleAddPlant = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.elements.name.value,
      image: e.target.elements.image.value,
      price: parseFloat(e.target.elements.price.value),
    };

    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(newPlant => setPlants([...plants, newPlant]));

    e.target.reset();
  };

  // Toggle sold out status
  const handleToggleSoldOut = (plantId) => {
    setSoldOutIds(prev => 
      prev.includes(plantId) 
        ? prev.filter(id => id !== plantId) 
        : [...prev, plantId]
    );
  };

  // Filter plants based on search term
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Type a name to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* New Plant Form */}
      <div className="new-plant-form">
        <h2>New Plant</h2>
        <form onSubmit={handleAddPlant}>
          <input 
            type="text" 
            name="name" 
            placeholder="Plant name" 
            required 
          />
          <input 
            type="url" 
            name="image" 
            placeholder="Image URL" 
            required 
          />
          <input 
            type="number" 
            name="price" 
            step="0.01"
            placeholder="Price" 
            required 
          />
          <button type="submit">Add Plant</button>
        </form>
      </div>

      {/* Plant List */}
      <div className="plant-list">
        {filteredPlants.map(plant => (
          <div 
            className="plant-card" 
            key={plant.id}
            data-testid="plant-item"
          >
            <img src={plant.image} alt={plant.name} />
            <h4>{plant.name}</h4>
            <p>Price: {plant.price}</p>
            <button 
              className={soldOutIds.includes(plant.id) ? 'sold-out' : 'primary'}
              onClick={() => handleToggleSoldOut(plant.id)}
            >
              {soldOutIds.includes(plant.id) ? 'Out of Stock' : 'In Stock'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;