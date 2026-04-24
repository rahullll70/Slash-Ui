import React from 'react';
import Navbar from '@/components/ui/navbar';
import Hero from '@/components/ui/hero';
import Footer from '@/components/ui/cta';
import FeaturedComponents from '@/components/ui/featuredComponents';
import Pricing from '@/components/ui/pricing';
import IndustryProof from '@/components/ui/IndustryProof';

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedComponents />
      <IndustryProof />
      <Pricing />
      <Footer />
    </div>
  );
};

export default page;
