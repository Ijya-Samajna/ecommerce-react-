import { useState, createContext, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if (existingCartItem) {
  //   return cartItems.map((cartItem) => {
  //     if (cartItem.id === productToAdd.id) {
  //       cartItem.quantity += 1; //this is incorrect, I am mutating the object key directly, which mutates the array directly, read more about this (immutability) module 9, lecture 123, 5.30
  //       return cartItem;
  //     }
  //     return cartItem;
  //   });
  // }

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decreaseCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
  // cartItems.map((cartItem) => {
  //   if(cartItem.id === productToRemove.id) {
  //     cartItem.quantity-=1  //this is incorrect, I am mutating the object key directly, which mutates the array directly, read more about this (immutability) module 9, lecture 123, 5.30
  //     return cartItem;
  //   }
  //   return cartItem;
  // })
};

const removeCartItem = (cartItems, itemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id)
} 

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  cartCount: 0,
  subtractItemFromCart: () => { },
  clearItemFromCart: () => { },
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const count = cartItems.reduce( //study about reduce syntax
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));
  
  const subtractItemFromCart = (product) =>
    setCartItems(decreaseCartItem(cartItems, product))

  const clearItemFromCart = (product) =>
    setCartItems(removeCartItem(cartItems, product))

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, subtractItemFromCart, clearItemFromCart, cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};