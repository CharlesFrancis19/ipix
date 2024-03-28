import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error('Error fetching product details:', error));
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const productDetails = Object.entries(product).map(([key, value]) => (
    <p key={key} className="mb-2">
      <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
    </p>
  ));

  return (
    <div className="flex mx-auto p-4 bg-gray-100 rounded shadow">
      <div className=" pr-4">
        <div style={{ width: '300px', height: '300px' }}>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={false} 
            loop={true} 
            autoplay={{ delay: 2000 }} 
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Product ${index + 1}`} className="w-full h-full rounded" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <div className="mt-4">
          {productDetails}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
