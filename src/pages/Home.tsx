import React from 'react';
import Hero from '../components/Hero/Hero';
import FeaturedCollections from '../components/FeaturedCollections/FeaturedCollections';
import SpecialOffers from '../components/SpecialOffers';
import TestimonialSection from '../components/Testimonials/TestimonialSection';
import Newsletter from '../components/Newsletter/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCollections />
      <SpecialOffers />
      <TestimonialSection />
      <Newsletter />
    </main>
  );
}