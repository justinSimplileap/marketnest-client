import { Product } from '@/types';
import { formatPrice } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';

type RelatedProductsProps = {
  products: Product[];
  onProductClick: (product: Product) => void;
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  onProductClick,
}) => (
  <div className="p-4">
    <h2 className="text-lg font-bold mb-4">Related Products</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <div
            className="bg-white p-4 shadow rounded-lg cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            <div className="w-full h-full">
              <Image
                src={
                  product?.images[0]?.imageUrl || '/default-product-image.jpg'
                }
                alt={product.name}
                width={150}
                height={150}
                className="rounded-lg w-auto mx-auto max-h-72 object-contain"
              />
            </div>
            <h3 className="mt-2">{product.name}</h3>
            <p className="text-green-600">{formatPrice(product?.price)}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default RelatedProducts;
