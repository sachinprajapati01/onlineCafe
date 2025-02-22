import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Testimonials.css";
const maleSymbol =  require("../assets/maleSymbol.jpg")
const femaleSymbol =  require("../assets/femaleSymbol.jpg")
const testimonials = [
  {
    id: 1,
    name: "Amit Verma",
    role: "Working Professional",
    text: "Online Cafe saved me so much time!",
    image: maleSymbol,
  },
  {
    id: 2,
    name: "Pooja Sharma",
    role: "College Student",
    text: "I had trouble filling out my PAN card form, but the Service Agent here made it super easy!",
    image: femaleSymbol,
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "UPSC Aspirant",
    text: "Excellent service! The real-time chat feature is a game-changer.",
    image: maleSymbol,
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h2 className="title">What Our Users Say</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="testimonial-card">
              <img src={testimonial.image} alt={testimonial.name} className="avatar" />
              <h3 className="name">{testimonial.name}</h3>
              <p className="role">{testimonial.role}</p>
              <p className="text">"{testimonial.text}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
