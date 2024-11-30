import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productImage = product?.images?.[0]?.imageUrl || '/assets/default.png';

  function formatPrice(price: number | string): string {
    if (isNaN(Number(price))) {
      return '0';
    }
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(
      Number(price)
    );
  }
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
        <Image
          src={productImage}
          alt={product?.name}
          width={192}
          height={192}
          className="w-full h-48 object-contain rounded"
        />
        <h2 className="text-lg font-semibold mt-4">{product?.name}</h2>
        <p className="text-gray-700 mt-2">
          {' '}
          ₹{product?.price ? formatPrice(product?.price) : '0'}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
