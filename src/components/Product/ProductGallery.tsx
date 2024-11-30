import { useEffect, useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  imageUrl: string;
  orderBy: string | number;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>();

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  if (images?.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <div className="flex">
      {/* Thumbnail List */}
      <div className="flex flex-col gap-2 pr-4">
        {images?.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image?.imageUrl}
              alt={`Thumbnail ${index + 1}`}
              width={60}
              height={60}
              className={`rounded ${
                selectedImage === image ? 'border-2 border-blue-500' : ''
              }`}
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 flex justify-center items-center w-full h-[60vh]">
        <Image
          src={selectedImage?.imageUrl ?? '/path/to/placeholder.jpg'}
          alt="Selected Product Image"
          width={250}
          height={250}
          className="rounded-lg w-auto h-full "
        />
      </div>
    </div>
  );
};

export default ProductGallery;
