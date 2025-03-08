import React from "react";
import Hero from "./hero/Hero";
import Contact from "../contact/ContactForm";
import Service from "./service/Service";
import Review from "../review/ReviewPage"
import { FaQ } from "react-icons/fa6";
import Faq from "../faq/FaqSection";
const Home = () => {
  return (
    <div className=" w-full min-h-screen pb-16">
    {/* hero */}
    <Hero />
    {/* service */}
    <Service />
    {/* <About /> */}

    {/* <Contact /> */}
    <Faq />
    <Review />
    
    </div>
  );
}; 

export default Home;
