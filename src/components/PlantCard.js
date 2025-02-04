import React from 'react';

function PlantCard({
  plant,
  markAsSoldOut,
  deletePlant,
  editPriceId,
  setEditPriceId,
  newPrice,
  setNewPrice,
  updatePrice,
}) {
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button
        className={plant.soldOut ? '' : 'primary'}
        onClick={() => markAsSoldOut(plant.id)}
      >
        {plant.soldOut ? 'Out of Stock' : 'In Stock'}
      </button>
      <button onClick={() => deletePlant(plant.id)}>Delete</button>
      {editPriceId === plant.id ? (
        <div>
          <input
            type="number"
            placeholder="New Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button onClick={() => updatePrice(plant.id)}>Save</button>
          <button onClick={() => setEditPriceId(null)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setEditPriceId(plant.id)}>Edit Price</button>
      )}
    </li>
  );
}

export default PlantCard;