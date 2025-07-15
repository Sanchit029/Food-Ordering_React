import Header from "./Components/Header";
import Meals from "./Components/Meals";
import Cart from "./Components/UI/Cart";
import { CartContextProvider } from "./Components/store/CartContext";
import {UserProgressContextProvider} from "./Components/store/UserProgressContext";
import Checkout from "./Components/Checkout";
function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart/>
        <Checkout/>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
