"use client";

import React from 'react';
import GarbhaSanskarCard from './GarbhaSanskarCard';
import { PregnancyProvider } from '@/src/context/PregnancyContext';


export default function GarbhaSanskarCardWrapper() {
  return (
    <PregnancyProvider>
      <GarbhaSanskarCard />
      
    </PregnancyProvider>
  );
}
