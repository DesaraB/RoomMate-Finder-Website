import React from "react";
import "./home-page.css";
import { HeroBanner } from "../../Components/HeroBanner/HeroBanner";
import { ServicesSection } from "../../Components/ServicesSection/service";
import { Carousel } from "../../Components/Carousel/Carousel";
import { Footer } from "../../Components/Footer/Footer";

export const HomePage = () => {
  return (
    <div className="cont">
      <HeroBanner />
      <ServicesSection />
      <Carousel />
      <Footer />
    </div>
  );
};
