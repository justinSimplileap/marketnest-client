import React, { useState } from 'react';
import { formatPrice } from '@/utils/helper';
import { Product } from '@/types';

interface ProductDetailsProps {
  product: Product;
  onVariantChange: (variant: Product['variants'][0]) => void;
}

const ProductDetails = ({ product, onVariantChange }: ProductDetailsProps) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  console.log('product detaildsd page ', selectedVariant);

  const handleVariantChange = (variant: Product['variants'][0]) => {
    setSelectedVariant(variant);
    onVariantChange(variant);
  };

  return (
    <div className="product-details">
      <h1 className="text-2xl font-semibold">{product.name}</h1>

      <div className="flex items-center mt-2">
        <span className="text-lg font-medium text-gray-600">Brand: </span>
        <span className="text-lg text-gray-800 ml-2">{product.brand.name}</span>
      </div>

      <p className="mt-4 text-gray-700">{product.description}</p>

      {/* Display the price only for the selected variant */}
      <div className="mt-6">
        {product.variants.map((variant, index) => (
          <div key={index}>
            {selectedVariant.color === variant.color ? (
              <>
                <span className="text-2xl font-semibold">
                  {selectedVariant?.discountPrice === variant.discountPrice
                    ? `${formatPrice(variant.discountPrice)}`
                    : formatPrice(variant.discountPrice)}
                </span>
                <span className="ml-2 text-lg text-gray-500 line-through">
                  {selectedVariant?.variantPrice === variant.variantPrice
                    ? `${formatPrice(variant.variantPrice)}`
                    : formatPrice(variant.variantPrice)}
                </span>
              </>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="flex gap-4 mt-4">
          {product.variants.map((variant, index) => (
            <>
              {/* <div className="mt-6">
                <span className="text-2xl font-semibold">
                  {selectedVariant?.discountPrice === variant.discountPrice
                    ? `${formatPrice(variant.discountPrice)}`
                    : formatPrice(variant.discountPrice)}
                </span>
                <span className="ml-2 text-lg text-gray-500 line-through">
                  {selectedVariant?.variantPrice === variant.variantPrice
                    ? `${formatPrice(variant.variantPrice)}`
                    : formatPrice(variant.variantPrice)}
                </span>
              </div> */}
              <div
                key={index}
                className={`variant-details p-4 border rounded-md cursor-pointer ${
                  selectedVariant.color === variant.color ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleVariantChange(variant)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">
                    {variant.color} - {variant.size}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Storage: {variant.storage}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
