import './product-card.style.scss';

import { useContext } from 'react';

import Button from '../button/button.component';

import { CartContext } from '../contexts/cart.context';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  // 传入product数据
  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      {/* 点击按钮则触发addProductToCart */}
      <Button buttonType="invert" onClick={addProductToCart}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
