"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase'; // Import Supabase client
import Carousel from '../components/Carousel';

const VesselTracking = () => {
  const [searchType, setSearchType] = useState('imo'); // Track search type
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [currentSentence, setCurrentSentence] = useState(0); // Sentence index state
  const router = useRouter(); // For navigation

  const sentences = [
    "Checking Vessel Coordinates",
    "Validating AIS information",
    "Confirming IMO Number"
  ];

  const fetchVesselData = async () => {
    setLoading(true);
    setError(null);
    setModalVisible(true); // Show modal

    try {
      let response;
      if (searchType === 'imo') {
        response = await supabase.from('vessels').select('*').eq('imo_number', query);
      } else {
        response = await supabase.from('vessels').select('*').eq('vessel_name', query);
      }

      const { data, error } = response;
      if (error) {
        throw new Error('Vessel data not found');
      }

      console.log('Response:', data);

      if (data.length === 0) {
        throw new Error('No vessel data found');
      }

      setTimeout(() => {
        setModalVisible(false);
        router.push(`/ais-result?data=${encodeURIComponent(JSON.stringify(data[0]))}`);
      }, 9000);
    } catch (error) {
      console.error('Error fetching vessel data:', error);
      setTimeout(() => {
        setError(error.message || 'Vessel data not found');
        setModalVisible(false);
      }, 9000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      const interval = setInterval(() => {
        setCurrentSentence((prevSentence) => (prevSentence + 1) % sentences.length);
      }, 3000); // Change sentence every 3 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [modalVisible]);

  return (
    <div className="relative container mx-auto p-8 md:pt-20 min-h-screen bg-center">
      <h1 className=" text-4xl md:text-6xl font-semibold text-center text-[#241d66]">Track a Vessel</h1>
      <h1 className="text-lg text-center text-slate-600">Monitor and locate a vessel on Anfashlogistics BV</h1>
      <div className="mt-6 flex flex-col lg:px-44">
        <div className='border-1 rounded-lg shadow-custom-lg px-[30px] py-[60px]   md:rounded-full md:p-[25px] mt-4 bg-white bg-opacity-75'>
          <div className='flex flex-col items-center md:flex-row md:gap-2'>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchType === 'imo' ? 'Type or Enter IMO Number' : 'Type or Enter Vessel Name'}
              className="border-[1px] px-4 py-5 md:p-6 w-full rounded-full border-[#3423cb] outline-none"
            />
            <button
              onClick={fetchVesselData}
              className="bg-[#3423cb] text-sm md:text-lg font-semibold text-white px-2 md:px-6 py-4 mt-2 w-4/6 md:mt-0 md:w-3/6 md:py-6 border rounded-full"
            >
              Track Vessel
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <label className="mr-6">
            <input
              type="radio"
              value="imo"
              checked={searchType === 'imo'}
              onChange={() => setSearchType('imo')}
              className="mr-2"
            />
            Search by IMO
          </label>
          <label>
            <input
              type="radio"
              value="name"
              checked={searchType === 'name'}
              onChange={() => setSearchType('name')}
              className="mr-2"
            />
            Search by Vessel Name
          </label>
        </div>
      </div>
      {loading && (
        <p className="mt-4 text-center">Fetching vessel information...</p>
      )}
      {error && (
        <p className="mt-4 text-center text-red-500">{error}</p>
      )}
      <div className="mt-20 md:mt-32">
        <Carousel />
      </div>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-indigo-900 bg-opacity-90">
          <div className="bg-indigo-500 p-8 rounded-lg shadow-lg text-white text-center w-11/12 md:w-2/4">
            <p className="text-xl font-semibold">Wait, please</p>
            <p className="mt-2">We are retrieving the information from the shipping line.</p>
            <p className="mt-2">It can take up to 30 seconds.</p>
            {/* <p className="mt-2">If it takes more you might have encountered an issue. Please press or reload the page.</p> */}
            <div className="mt-4 flex justify-center">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-white h-12 w-12"></div>
            </div>
            <div className="mt-4">
              <p className="text-xl font-bold">{sentences[currentSentence]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VesselTracking;
