import { use } from "react";
import { CartContext } from "../store/CartContext.jsx";
import Modal from "./Modal.jsx";
import currencyFormatter from "../../utils/currencyFormatter";
import Button from "./Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "../CartItem.jsx";

export default function Cart() {
  const cartctx = use(CartContext);
  const userProgressctx = use(UserProgressContext);
  const cartTotal = cartctx.items.reduce((totalPrice, item) => {
    return item.price * item.quantity + totalPrice;
  }, 0);
  function handleCloseCart() {
    userProgressctx.hideCart();
  }
  function handleCheckout() {
    userProgressctx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressctx.progress === "cart"}
      onClose={userProgressctx.progress === "cart"?handleCloseCart:null}
    >
      <ul>
        {cartctx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => cartctx.addItem(item)}
              onDecrease={() => cartctx.removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className=" modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartctx.items.length > 0 && (
          <Button onClick={handleCheckout}>Go to CheckOut</Button>
        )}
      </p>
    </Modal>
  );
}
