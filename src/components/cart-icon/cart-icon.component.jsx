import { useContext } from 'react';
import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCount,
} from './cart-icon.styles';

import { CartContext } from '../contexts/cart.context';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  // when click icon, reverse the isCartOpen state => determained cart state
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer>
      <ShoppingIconContainer onClick={toggleIsCartOpen} />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
