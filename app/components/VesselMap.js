import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const supabaseUrl = 'https://ngjbcfvuqorstbwjqhvl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5namJjZnZ1cW9yc3Rid2pxaHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMzE0OTksImV4cCI6MjAzNjcwNzQ5OX0.j-Y6039mdG50HnnIxCe2kLTMASWyknoT2IYgsIypcZM'; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

const VesselMap = ({ vesselId }) => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null); // Ref to hold the map container element

    useEffect(() => {
        const fetchVesselData = async () => {
            try {
                const { data, error } = await supabase
                    .from('vessels')
                    .select('latitude, longitude')
                    .eq('id', vesselId)
                    .single();

                if (error) {
                    throw error;
                }

                const { latitude, longitude } = data;

                // Check if map already exists
                if (map) {
                    map.setView([latitude, longitude], 10); // Just update the view if map exists
                } else {
                    // Initialize the map using Leaflet
                    const leafletMap = L.map(mapContainer.current).setView([latitude, longitude], 10);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: 'Map data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(leafletMap);

                    L.marker([latitude, longitude]).addTo(leafletMap);

                    setMap(leafletMap); // Set the map instance to state
                }
            } catch (error) {
                console.error('Error fetching vessel data:', error);
            }
        };

        if (vesselId) {
            fetchVesselData();
        }

        // Cleanup function to destroy the map when component unmounts or when fetching new data
        return () => {
            if (map) {
                map.remove(); // Ensure map is properly destroyed
                setMap(null); // Reset map state
            }
        };
    }, [vesselId]);

    return (
 
        <>
        <div 
            ref={mapContainer} 
            id="map-container" 
            className='rounded-b-2xl lg:rounded-r-2xl w-full' 
            style={{ width: '100%', height: '400px' }}
        >
            {!map && <p>Loading map...</p>}
        </div>
    </>
    );
};

export default VesselMap;
