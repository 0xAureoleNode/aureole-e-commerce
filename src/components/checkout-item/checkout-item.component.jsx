import {
  CheckoutItemContainer,
  ImageContainer,
  RemoveButton,
  Quantity,
  BaseSpan,
  Arrow,
  Value,
} from './checkout-item.style';
import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';
const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemToCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  const clearItemHandler = () => clearItemToCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemToCart(cartItem);
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={addItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={removeItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price} </BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
