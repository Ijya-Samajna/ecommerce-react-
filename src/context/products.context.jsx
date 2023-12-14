import { createContext, useState, useEffect } from 'react';
import SHOP_DATA from '../shop-data.js';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const ProductsContext = createContext({
  products: []
})

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products };

  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // }, [])

  useEffect(async () => {
    const categoryMap = await getCategoriesAndDocuments('categories'); //we want to create our own async function and await its result when we call an async function inside useEffect
  }, []);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}