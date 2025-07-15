import currencyFormatter from "../utils/currencyFormatter";
import Button from "./UI/Button";
import { CartContext } from "./store/CartContext.jsx";
import { useContext } from "react";
export default function MealItem({ content }) {
  const cartCtx = useContext(CartContext);
  function handleAddItem() {
    cardCtx.addItem(content);
  }
  function handleImageError(event) {
    event.target.src = 'URL_TO_FALLBACK_IMAGE'; // Replace with your fallback image URL
    event.target.alt = 'Failed to load image';
  }

  return (

    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${content.image}`} alt="" />
        <div>
          <h3>{content.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(content.price)}
          </p>
          <p className="meal-item-description">{content.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItem}>Add to Cart</Button>
        </p>
      </article>

    </li>
  );
}
