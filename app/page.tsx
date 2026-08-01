import React from 'react';

import Hero from '@/components/hero';
import Footer from '@/components/cta';
import FeaturedComponents from '@/components/featuredComponents';
import Pricing from '@/components/pricing';
import IndustryProof from '@/components/IndustryProof';
import Navbar from '@/components/navbar';

const page = () => {
  return (
    <div>
     <Navbar/>
      <Hero />
      <FeaturedComponents />
      <IndustryProof />
      <Pricing />
      <Footer />
    </div>
  );
};

export default page;
