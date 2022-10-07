import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from './product-card.style';

import { useContext } from 'react';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { CartContext } from '../contexts/cart.context';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  // 传入product数据
  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      {/* 点击按钮则触发addProductToCart */}
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
