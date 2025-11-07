import { useActionState, use,  } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "./store/CartContext";
import currencyFormatter from "../utils/currencyFormatter";
import Input from "./UI/Input";
import UserProgressContext from "./store/UserProgressContext";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = use(CartContext);
  const userProgressCtx = use(UserProgressContext);

  const {
    data,
    error,
    sendRequest,
    clearData,
  } = useHttp("https://food-ordering-react-1.onrender.com/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return item.price * item.quantity + totalPrice;
  }, 0);
  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  async function checkoutAction(prevState , fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState,formAction,isSending] = useActionState(checkoutAction,null)

  let actions = (
    <>
      <Button type="button" onClick={handleClose} textOnly>
        Close
      </Button>
      <Button> Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending the data ...</span>;
  }
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  if (data) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success...</h2>
        <p>Your order was submitted successfully</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>

        <Input label="full-name" type="text" id="name" />
        <Input label="email-addr" type="email" id="email" />
        <Input label="street" type="text" id="street" />

        <div className="control-row">
          <Input label="postal-code" type="text" id="postal-code" />
          <Input label="city" type="text" id="city" />
        </div>

        <p className="modal-actions">{actions}</p>

        {error && (
          <Error title="Failed to Submit order" message={error}></Error>
        )}
      </form>
    </Modal>
  );
}
