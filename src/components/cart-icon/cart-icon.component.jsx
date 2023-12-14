import { useContext } from 'react';
import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles';
import { CartContext } from '../../context/cart.context';

const CartIcon = () => {
  const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen)
  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon className='shopping-icon'/>
      <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;