import { createContext, useState, useEffect } from 'react';

/* 
product {id, name, price, imageUrl}
Cart Item {id, name, price, imageUrl, quantity}
*/

// get back a new array of car items
// The map() method creates a new array
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  // Array.prototype.find()
  // 这个existingCartItem是用来判断cartItems里面是否存在productToadd的东西
  // find一般来说会返回cartItems里的一项，如果没有则不返回
  // creating a new cart item
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // If found, increment quantity
  // map迭代返回新的数组，cartItems里面跟productToAdd相同id的+1
  // 不相同的cartItem则保持不变
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return new array with modified cartItems / new cart item
  // productToAdd不存在CartItem里面，则新增productToAdd于cartItems中，数量标1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},

  cartItems: [],
  addItemToCart: () => {},

  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  // init the cart items and setCartItems
  const [cartItems, setCartItems] = useState([]);

  // recounting the total quantity every time the car items changes
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  // when user clicks on this <Add to Cart>
  const addItemToCart = (productToAdd) => {
    // useState更新状态， give back the appropriate array
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
