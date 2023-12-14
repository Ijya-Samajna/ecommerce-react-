import { useContext } from 'react';
import {ProductCartContainer, Footer, Name, Price} from './product-card.styles';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { CartContext } from '../../context/cart.context';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(product)
  };

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>${price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} buttonProps={{onClick: addProductToCart}}>
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard