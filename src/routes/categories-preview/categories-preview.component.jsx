import { useContext, Fragment } from 'react';
// import { ProductsContext } from '../../context/products.context';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    // <Fragment>
    //   {Object.keys(categoriesMap).map((title) => ( //mapping over the keys of categoryMap, which are collection names like hats, jackets, etc
    //     <Fragment key={title}>
    //       <h2>{title}</h2>
    //       <div className='products-container'>
    //         {categoriesMap[title].map((product) => ( //mapping over the values of the key, which is an array containing products
    //           <ProductCard key={product.id} product={product} />
    //         ))}
    //       </div>
    //     </Fragment>
    //   ))}
    // </Fragment>
    <div className='shop-container'>
      {
        Object.keys(categoriesMap).map((key) => {
          const products = categoriesMap[key];
          return <CategoryPreview key={key} title={key} products={products}/> //we need to send title input separately as we need to display the category title too
        })
      }
    </div>
  )
}

export default CategoriesPreview;