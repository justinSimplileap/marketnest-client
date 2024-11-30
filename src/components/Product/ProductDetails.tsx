const ProductDetails = ({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: number | string;
}) => (
  <div className="p-4 space-y-2">
    <h1 className="text-2xl font-bold">{name}</h1>
    <p className="text-gray-600">{description}</p>
    <p className="text-xl font-semibold text-green-600">₹{price}</p>
  </div>
);

export default ProductDetails;
