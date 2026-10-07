'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import QuickStatsBar from '../components/QuickStatsBar';
import Footer from '../components/Footer';
import { articleData } from '../data/articleData';

export default function Page() {
  return (
    <main>
      <Header />
      <HeroSection meta={articleData.meta} />
      <QuickStatsBar stats={articleData.quickStats} />
      <Footer />
    </main>
  );
}
