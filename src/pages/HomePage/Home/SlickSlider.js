import React from "react";
import Slider from "react-slick";


const SlickSlider = () => {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };
  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        <div className="w-full">
          <img
            className="object-fill rounded-md h-80 w-full"
            src="https://i.ibb.co/kXR9Nkj/banner1.jpg"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            className="object-fill rounded-md h-80 w-full"
            src="https://i.ibb.co/zsgMR2d/banner2.jpg"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            className="object-fill rounded-md h-80 w-full"
            src="https://i.ibb.co/z7sXJ8Z/banner3.jpg"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            className="object-fill rounded-md h-80 w-full"
            src="https://i.ibb.co/kMb2705/banner4.jpg"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            className="object-fill rounded-md h-80 w-full"
            src="https://i.ibb.co/m0128HW/banner5.jpg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
};

export default SlickSlider;
