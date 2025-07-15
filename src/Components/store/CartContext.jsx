import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart:()=>{}
});

function cartReducer(state, action) {
  if (action.type == "add-item") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type == "remove-item") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updatedItems = [...state.items];
    if (updatedItems[existingCartItemIndex].quantity > 1) {
      const existingItem = updatedItems[existingCartItemIndex];
      const reducedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      updatedItems[existingCartItemIndex] = reducedItem;
    } else if (updatedItems[existingCartItemIndex].quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type == "clear-cart") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  function addItem(item) {
    dispatchCartAction({ type: "add-item", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "remove-item", id });
  }

  function clearCart()
  {
    dispatchCartAction({type:"clear-cart"});
  }

  console.log(cartContext);
  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContextProvider;
