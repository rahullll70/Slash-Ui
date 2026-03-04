import React from 'react';
import Navbar from '@/components/ui/navbar';
import Hero from '@/components/ui/hero';
import Footer from '@/components/ui/footer';
import FeaturedComponents from '@/components/ui/featuredComponents';
import Pricing from '@/components/ui/pricing';

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
