"use client";
import AITools from "@/src/components/AITools/AITools";
import Footer from "@/src/components/Footer/Footer";
import Hero from "@/src/components/Hero/Hero";
import Navbar from "@/src/components/Navbar/Navbar";
import Plan from "@/src/components/Plan/Plan";
import Testimonial from "@/src/components/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AITools />
      <Testimonial />
      <Plan />
      <Footer />
    </>
  );
};
export default Home;
