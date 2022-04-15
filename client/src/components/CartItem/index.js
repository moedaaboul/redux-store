import React from 'react';
// import { useStoreContext } from "../../utils/GlobalState";
// import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { useDispatch } from 'react-redux';
import {
  removeFromCartReducer,
  updateCartQuantity,
} from '../../features/product/productSlice';
import { idbPromise } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  // const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch(removeFromCartReducer({ _id: item._id }));
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch(removeFromCartReducer({ _id: item._id }));
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch(
        updateCartQuantity({ _id: item._id, purchaseQuantity: parseInt(value) })
      );
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
