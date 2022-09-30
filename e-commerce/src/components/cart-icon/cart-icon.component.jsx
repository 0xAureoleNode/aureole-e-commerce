import { useContext } from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../contexts/cart.context';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  // when click icon, reverse the isCartOpen state => determained cart state
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpen} />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;