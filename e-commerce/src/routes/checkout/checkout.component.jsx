import {
  CheckOutContainer,
  CheckOutHeader,
  HeaderBlock,
  Total,
} from './checkout.style';
import { useContext } from 'react';
import { CartContext } from '../../components/contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const CheckOut = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <CheckOutContainer>
      <CheckOutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
      </CheckOutHeader>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <Total>Total: ${cartTotal}</Total>
    </CheckOutContainer>
  );
};

export default CheckOut;
