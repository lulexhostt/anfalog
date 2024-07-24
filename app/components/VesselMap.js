import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../../lib/supabase'; // Import the singleton Supabase client

const VesselMap = ({ vesselId }) => {
    const mapContainer = useRef(null);
    const mapInstanceRef = useRef(null); // To store the map instance

    useEffect(() => {
        if (!vesselId || !mapContainer.current) return;

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

                if (mapInstanceRef.current) {
                    // Update the map view if already initialized
                    console.log('Updating map view to:', latitude, longitude);
                    mapInstanceRef.current.setView([latitude, longitude], 10);
                } else {
                    // Initialize the map if it has not been initialized
                    console.log('Initializing map at:', latitude, longitude);
                    const leafletMap = L.map(mapContainer.current, {
                        center: [latitude, longitude],
                        zoom: 10,
                        layers: [
                            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: 'Map data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            })
                        ]
                    });

                    L.marker([latitude, longitude]).addTo(leafletMap);

                    mapInstanceRef.current = leafletMap; // Store the map instance in ref
                }
            } catch (error) {
                console.error('Error fetching vessel data:', error);
            }
        };

        fetchVesselData();

        return () => {
            if (mapInstanceRef.current) {
                console.log('Removing map instance');
                mapInstanceRef.current.remove(); // Ensure map is properly destroyed
                mapInstanceRef.current = null; // Reset map instance ref
            }
        };
    }, [vesselId]);

    return (
        <div 
            ref={mapContainer} 
            id="map-container" 
            className='rounded-b-2xl lg:rounded-r-2xl w-full' 
            style={{ width: '100%', height: '400px' }}
        >
            {!mapInstanceRef.current && <p>Loading map...</p>}
        </div>
    );
};

export default VesselMap;
