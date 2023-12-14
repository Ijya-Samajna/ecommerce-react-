import { useContext } from 'react';
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../context/cart.context';


const Checkout = () => {
  const {cartItems, cartTotal} = useContext(CartContext)
  return (
    <CheckoutContainer>
      {
        cartItems.length ?
          <CheckoutContainer>
            <CheckoutHeader>
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
                <span>Remove</span>
              </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) => (
              <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />
            ))}
            <Total>TOTAL: ${cartTotal}</Total>
          </CheckoutContainer>
          : <div>Your cart is empty</div>
      }
    </CheckoutContainer>
  )
}

export default Checkout;