// MobileView.js

"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProgressBar from '../components/ProgressBar'; // Import the ProgressBar component
// import VesselMap from '../components/VesselMap';
import CountryFlag from '../components/CountryFlag';
import Carousel from '../components/Carousel';

const MobileView = () => {
    const searchParams = useSearchParams();
    const data = searchParams.get('data');

    // Safely parse the data
    let vesselData = null;
    try {
        vesselData = data ? JSON.parse(data) : null;
        console.log('Parsed vessel data:', vesselData);
    } catch (error) {
        console.error('Error parsing vessel data:', error);
    }

    // State to hold the vessel photo URL
    const [vesselPhotoUrl, setVesselPhotoUrl] = useState(null);

    // State to hold the vessel photo URL
    const [vesselCountryFlagUrl, setvesselCountryFlagUrl] = useState(null);

    useEffect(() => {
        // Fetch vessel photo URL when component mounts
        const fetchVesselPhoto = async () => {
            if (vesselData && vesselData.vessel_image_url) {
                try {
                    const photoUrl = vesselData.vessel_image_url;
                    console.log('Fetched vessel photo URL:', photoUrl); // Debugging log
                    setVesselPhotoUrl(photoUrl);
                } catch (error) {
                    console.error('Error fetching vessel photo:', error);
                }
            } else {
                console.error('Invalid or missing photo:', vesselData ? vesselData.vessel_image_url : 'vesselData is null');
            }
        };

        fetchVesselPhoto();
    }, [vesselData]); // Fetch photo URL whenever vesselData changes


    useEffect(() => {
        // Fetch vessel photo URL when component mounts
        const fetchVesselCounryFlag = async () => {
            if (vesselData && vesselData.flag_url) {
                try {
                    const flagUrl = vesselData.flag_url;
                    console.log('Fetched vessel country flag URL:', flagUrl); // Debugging log
                    setvesselCountryFlagUrl(flagUrl);
                } catch (error) {
                    console.error('Error fetching vessel country flag photo:', error);
                }
            } else {
                console.error('Invalid or missing photo:', vesselData ? vesselData.flag_url : 'vesselData is null');
            }
        };

        fetchVesselCounryFlag();
    }, [vesselData]); // Fetch photo URL whenever vesselData changes

    // Progress bar steps (adjust based on your specific steps)
    const progressSteps = [20, 40, 60, 80, 100];
    const currentProgress = vesselData?.vessel_movement || 0; // Ensure vessel_movement is correctly set

    return (
        <div className="container mx-auto p-4 text-slate-700">
            {vesselData ? (
                <motion.div
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5 }}
                >
                    <h2 className="text-2xl font-bold py-4 px-2 text-blue-800">Vessel Information</h2>
                    <div className="grid grid-cols-1  ">
                        <div className="col-span-1 h-full rounded-2xl mb-5 relative border-1 shadow-custom-lg bg-opacity-75">
                            <div className=" section-1 rounded-t-2xl">
                                {vesselPhotoUrl ? (
                                    <div className="">
                                        <div className="w-50 h-50 rounded-t-2xl overflow-hidden">
                                            <img src={vesselPhotoUrl} alt="Vessel" className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                ) : (
                                    <p>Loading vessel photo...</p>
                                )}
                            </div>
                            <div className=" section-2 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 pt-8 pb-6 text-left text-xs font-semibold text-[#633289] uppercase tracking-wider">
                                                Vessel Name
                                            </th>
                                            <th scope="col" className="px-6 pt-8 pb-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {vesselData.vessel_name}
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="bg-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-left text-base font-semibold text-gray-900 tracking-wider">
                                                Type
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <img src="https://ngjbcfvuqorstbwjqhvl.supabase.co/storage/v1/object/public/oliehandelvisbv/shipvessel.png" alt="Vessel" className="w-[38px] h-[43px] object-contain" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-900">
                                                IMO
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {vesselData.imo_number}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-900">
                                                MMSI
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {vesselData.mmsi_number}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-900">
                                                Flag
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                <img src={vesselCountryFlagUrl} alt="Flag" className="w-[38px] h-[40px] object-contain rounded-full" />
                                            </td>
                                        </tr>

                                      
                                  


                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-900">
                                                Call Sign
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {vesselData.call_sign}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-900">
                                                AIS Transponder
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {vesselData.ais_transponder_class}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-900">
                                                Vessel type
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {vesselData.general_vessel_type}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div className="col-span-2 flex flex-col  gap-6 mt-6">
                            <div className=" section-3  h-[550px] p-2 rounded-2xl border-1 shadow-custom-lg bg-opacity-75  flex flex-col gap-1">


                                <div className=' flex flex-col h-3/6  overflow-hidden justify-center'>

                                    <div className='font-semibold text-indigo-600 text-xl flex flex-row  justify-between   px-4'>
                                        <div >{vesselData.departure_port}</div>
                                        <div >{vesselData.arrival_port}</div>
                                    </div>
                                    <div className='font-semibold text-indigo-500 text-2xl flex flex-row  justify-between px-10 py-2'>
                                    <img src={vesselCountryFlagUrl} alt="Flag" className="w-[46px] h-[50px] object-contain rounded-2xl" />
                                    <img src={vesselData.arrival_portflag_url}alt="Flag" className="w-[46px] h-[50px] object-contain rounded-2xl" />
                                    </div>

                                    <div className='flex flex-col px-12 gap-4 '>
                                        {/* Include Progress Bar Component */}
                                        <ProgressBar progressSteps={progressSteps} currentProgress={currentProgress} />
                                        <div className='flex flex-row justify-between text-slate-500 text-sm'>
                                            <p> ATD </p>
                                            <p>ATA</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-row justify-between text-slate-500 text-sm px-12'>
                                        <p>{vesselData.estimated_time_of_arrival} <strong></strong> </p>
                                        <p>{vesselData.estimated_time_of_arrival} <strong></strong></p>
                                    </div>

                                    <div className='flex flex-row justify-between text-slate-500 text-sm px-12'>
                                        <p><strong>(UTC+2)</strong> </p>
                                        <p><strong>(UTC+2)</strong></p>
                                    </div>

                                </div>




                                <hr className="border-t-1 border-gray-300 my-2" />




                                <div className='flex items-center justify-center h-3/6  overflow-hidden px-2'>
                                    <div className='overflow-auto '>
                                        <p className='pb-4'><strong>Summary</strong></p>
                                        <p>The current position of <strong>{vesselData.vessel_name}</strong> is at North Sea reported some minutes ago by
                                        AIS. The vessel is en
                                        route to the port of <strong>{vesselData.arrival_port}</strong>  and expected to arrive there on <strong> {new Date(vesselData.estimated_time_of_arrival).toLocaleString()}</strong>.
                                        The vessel <strong>{vesselData.vessel_name}</strong> (IMO<strong>  {vesselData.imo_number}</strong>, MMSI <strong>{vesselData.mmsi_number}</strong>) is a Sailing Vessel
                                        with length overall (LOA) as <strong>59.7</strong> meters and width <strong className='text-green-600'>12.3</strong> <span className='text-green-600'>meters</span>
                                    </p>
                                    </div>
                                </div>





                            </div>




                            <div className=" flex flex-col  h-[800px]  rounded-2xl mb-5 border-1 shadow-custom-lg bg-opacity-75">



                                <div className=' flex flex-col px-7 pt-9 gap-6  w-full rounded-t-2xl h-[400px] '>
                                    {/* <hr className="border-t border-gray-200 mt-6 " /> */}
                                    

                                    <p className=' flex flex-row justify-between'><strong>Latitude:</strong> {vesselData.latitude}</p>

                                    <p className=' flex flex-row justify-between' ><strong>Longitude:</strong> {vesselData.longitude}</p>

                                    <p className=' flex flex-row justify-between'><strong>Draught:</strong> {vesselData.draught}</p>

                                    <p className=' flex flex-row justify-between'><strong>Speed:</strong> {vesselData.speed}</p>

                                    <p className=' flex flex-row justify-between'><strong>Course:</strong> {vesselData.course}</p>

                                    <p className=' flex flex-row justify-between'><strong>Position Received</strong> <span className='text-green-700'>Few mins ago</span> </p>

                                    <p className=' flex flex-row justify-between'><strong>ETA</strong> {new Date(vesselData.estimated_time_of_arrival).toLocaleString()}</p>


                                </div>



                                <div className='  h-[400px]'>
                                    {/* Replace static image with VesselMap component */}
                                    {/* <VesselMap vesselId={vesselData.id} /> */}
                                    
                                </div>


                            </div>


                        </div>







                        <div className=" section-6  flex flex-col col-span-2 h-[550px] rounded-3xl mb-5 border-1 shadow-custom-lg bg-opacity-75 gap-4 text-base">
                            <div className='h-16 bg-blue-800 w-full rounded-t-2xl text-slate-200 p-6 text-xl font-semibold'>Information and Voyage</div>

                            <div className=' flex flex-col gap-4 px-6  my-5 overflow-auto'>
                            <p> The current position of <strong>{vesselData.vessel_name}</strong>  with coordinates 20.67272° / -105.95633° as reported
                                    today by AIS to our vessel tracker app. The vessel's current speed is <strong>{vesselData.speed}</strong> Knots and is
                                    heading at the port of <strong>{vesselData.arrival_port}</strong> . The estimated time of arrival as calculated by Oliehandelvisbv vessel
                                    tracking app is <strong>{vesselData.estimated_time_of_arrival}</strong> (UTC+2) today.
                                </p>

                                <p>The vessel <strong>{vesselData.vessel_name}</strong> (IMO: <strong>{vesselData.imo_number}</strong>, MMSI: <strong>{vesselData.mmsi_number}</strong>) is a Passenger.
                                    It's sailing under
                                    the flag of {vesselData.departure_port}. In this page you can find information about the vessel's current position, last
                                    detected port calls, and current voyage information. If the vessel is not in coverage by AIS you will
                                    find the latest position.
                                </p>

                                <p>The current position of <strong>{vesselData.vessel_name}</strong>is detected by our AIS receivers and we are not responsible
                                    for the reliability of the data. The last position was recorded while the vessel was in Coverage by the
                                    AIS receivers of our vessel tracking app.
                                </p>

                                <p>The current draught of <strong>{vesselData.vessel_name}</strong> as reported by AIS is <strong>{vesselData.draught}</strong>meters.</p>
                            </div>

                        </div>

                        <div className=" section-7 col-span-1 h-[500px]  rounded-3xl border-1 shadow-custom-lg bg-opacity-75 text-base">
                            <div className='h-16 bg-blue-800 w-full rounded-t-2xl text-slate-200 p-6 text-xl font-semibold'>Ais Status</div>

                            <div className=' flex flex-col gap-6 px-8 py-8 text-sm'>
                                <div className=' flex flex-row justify-between'><strong>AIS Source:</strong> {vesselData.ais_source}</div>

                                <div className=' flex flex-row justify-between'><strong>Reported Destination:</strong> {vesselData.reported_destination}</div>
                                <div className=' flex flex-row justify-between'><strong>Detailed vessel type:</strong> {vesselData.detailed_vessel_type}</div>
                                <div className=' flex flex-row justify-between'><strong>Departure Port:</strong> {vesselData.departure_port}</div>
                                <div className=' flex flex-row justify-between'><strong>Arrival Port:</strong> {vesselData.arrival_port}</div>
                                <div className=' flex flex-row justify-between'><strong>Navigational status:</strong> {vesselData.navigation_status}</div>
                                <div className=' flex flex-row justify-between'><strong>True heading:</strong> {vesselData.true_heading}</div>
                                <div className=' flex flex-row justify-between'><strong>ETA</strong> {new Date(vesselData.estimated_time_of_arrival).toLocaleString()}</div>

                            </div>
                            {/* <div className='h-16 bg-blue-800 w-full rounded-b-2xl text-slate-200 p-6 text-xl font-semibold'>Ais Status</div> */}



                        </div>
                    </div>
                </motion.div>
            ) : (
                <p className="mt-4 text-center">No vessel data available.</p>
            )}

            <div className=" section-8 mt-20 md:mt-30">
                <Carousel />
            </div>
        </div>
    );
};

export default MobileView;