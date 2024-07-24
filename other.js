"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProgressBar from '../components/ProgressBar';
import CountryFlag from '../components/CountryFlag';
import Carousel from '../components/Carousel';

const AisResult = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');

  // Safely parse the data
  let vesselData = null;
  try {
    vesselData = data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error parsing vessel data:', error);
  }

  const [vesselPhotoUrl, setVesselPhotoUrl] = useState(null);
  const [vesselCountryFlagUrl, setVesselCountryFlagUrl] = useState(null);
  const [arrivalPortFlagUrl, setArrivalPortFlagUrl] = useState(null);

  useEffect(() => {
    if (vesselData) {
      setVesselPhotoUrl(vesselData.vessel_image_url);
      setVesselCountryFlagUrl(vesselData.flag_url);
      setArrivalPortFlagUrl(vesselData.arrival_portflag_url);
    }
  }, [vesselData]);

  const progressSteps = [20, 40, 60, 80, 100];
  const currentProgress = vesselData?.vessel_movement || 0;

  return (
    <Suspense fallback={<div>Loading vessel data...</div>}>
      <div className="container mx-auto p-4 text-slate-700">
        {vesselData ? (
          <div>
            {/* Render vessel information */}
            <h2 className="text-2xl font-bold py-4 px-2 text-blue-800">Vessel Information</h2>
            {/* ... rest of your component */}
            <ProgressBar progressSteps={progressSteps} currentProgress={currentProgress} />
            <Carousel />
          </div>
        ) : (
          <p className="mt-4 text-center">No vessel data available.</p>
        )}
      </div>
    </Suspense>
  );
};

export default AisResult;
