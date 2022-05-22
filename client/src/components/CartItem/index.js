import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          {/* temp readOnly till onChange is added */}
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            readOnly
          />
          <span
            role="img"
            aria-label="trash"
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;