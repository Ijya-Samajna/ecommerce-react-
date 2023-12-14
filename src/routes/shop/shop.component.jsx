import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { Routes, Route } from 'react-router-dom';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

//first one displays 4 preview products of each category
//second one dynamically routes to the category detail page, showing all the products of that category

export default Shop;