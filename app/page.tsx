import React from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import FeaturedComponents from '@/components/featuredComponents';

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedComponents />
      <Footer />
    </div>
  );
};

export default page;
