import { useContext } from 'react';
import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './checkout-item.styles';
import { CartContext } from '../../context/cart.context';

const CheckoutItem = ({ checkoutItem }) => {
  const { name, imageUrl, price, quantity } = checkoutItem;
  const { addItemToCart, subtractItemFromCart, clearItemFromCart } = useContext(CartContext)

  const add = () => addItemToCart(checkoutItem);
  const subtract = () => subtractItemFromCart(checkoutItem);
  const remove = () => clearItemFromCart(checkoutItem)
  return (

    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan className='name'> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={subtract}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={add}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={remove}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem