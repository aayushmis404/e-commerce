import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductDetail from '../components/product/ProductDetail';
import { products } from '../data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;