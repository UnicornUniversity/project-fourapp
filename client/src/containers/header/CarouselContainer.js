import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Dynamically import images
const images = [];
const context = require.context(
  "../../assets/images/carousel/",
  false,
  /\.(png|jpe?g|svg)$/
);
context.keys().forEach((key) => {
  images.push(context(key));
});

export default () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={true}
      pagination={{ clickable: true }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="carouselImageWrapper">
            <img
              src={image}
              alt={`Carousel image ${index + 1}`}
              className="carouselImage"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
