import { use } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "./store/CartContext";
import UserProgressContext from "./store/UserProgressContext";

export default function Header() {
  const cartctx = use(CartContext);
  const userProgressctx = use(UserProgressContext);

  const totalItems = cartctx.items.reduce((totalNoOfItems , item)=>{
    totalNoOfItems = totalNoOfItems +item.quantity;
    return totalNoOfItems;
  },0)

  function handleShowCart(){
    userProgressctx.showCart();  
    
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="App-logo" />
        <h1 id="title">React Food</h1>
      </div>
      <Button textOnly onClick = {handleShowCart}>Cart({`${totalItems}`})</Button>
    </header>
  );
}
