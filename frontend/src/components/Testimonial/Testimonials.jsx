import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/1_dishang.jpg";
import ava02 from "../../assets/images/2_mihir.jpg";
import ava03 from "../../assets/images/3_kaushal.jpg";
import ava04 from "../../assets/images/4_dhrumil.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
        Absolutely blown away by the exceptional service. and attention to detail! From the moment we arrived until we left, every aspect of our experience was flawless. The staff went above and beyond to ensure our stay was perfect. Can't wait to come back!
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Dishang</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
        Hands down, the highlight of our trip! The ambiance, the food, the activities-everything was top-notch. We were treated like royalty from start to finish. It's wonder this place has such rave reviews. Highly recommend to anyone looking for an unforgettable experience
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Mihir</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
        Trip Amaze exceeded all expectations! The stunning location coupled with the warm hospitality made our stay truly memorable Whether you're seeking relaxation or adventure, this place has it all Kudos to the entire team for creating such an incredible atmospherel
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Kaushal</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
        I've traveled to many destinations, but Trip Amaze stands out as one of the best experiences I've ever had. The attention to detail, the friendliness of the staff, and the breathtaking views made it a trip to remember, Already planning my next visit
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava04} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Dhrumil</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
