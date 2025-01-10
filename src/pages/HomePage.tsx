import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/home/Navbar';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { HowItWorks } from '../components/home/HowItWorks';
import { Subjects } from '../components/home/Subjects';
import { Testimonials } from '../components/home/Testimonials';
import { FAQ } from '../components/home/FAQ';
import { Footer } from '../components/home/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-100 dark:to-dark-200">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Subjects />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};