import {CategoryPreviewContainer, Title, Preview} from './category-preview.styles';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((product, index) => index < 4) //returns products whose index is less than 4 in the array, i.e. first 4
          .map((product) => { //mapping over the returned products
            return <ProductCard key={product.id} product={product} />
          })}
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;