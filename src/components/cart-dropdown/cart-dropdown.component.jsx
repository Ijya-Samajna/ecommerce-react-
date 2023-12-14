import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // a different wau to navigate if we don't want to use LINK
import {CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles';
import Button from '../button/button.component';
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-item/cart-item.component';


const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/checkout')
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => {
            return (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            )
          })
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button buttonProps={{ onClick: navigateHandler }}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;