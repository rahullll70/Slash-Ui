import React from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import FeaturedComponents from '@/components/featuredComponents';
import Pricing from '@/components/pricing';

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedComponents />
      <Pricing />
      <Footer />
    </div>
  );
};

export default page;
