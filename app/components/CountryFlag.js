import React, { useEffect, useState } from 'react';

const CountryFlag = ({ countryCode }) => {
    const [flagUrl, setFlagUrl] = useState(null);

    useEffect(() => {
        const fetchCountryFlag = async () => {
            try {
                if (!countryCode) {
                    throw new Error('Country code is undefined or null');
                }

                // Construct the flag URL using a reliable API
                const apiUrl = `https://restcountries.com/v3.1/alpha/${countryCode.toLowerCase()}`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch country flag');
                }

                const data = await response.json();
                if (!data.flags || !data.flags.svg) {
                    throw new Error('Country flag URL not found in API response');
                }

                // Assuming data.flags.svg contains the URL to the flag image
                setFlagUrl(data.flags.svg);
            } catch (error) {
                console.error('Error fetching country flag:', error.message);
            }
        };

        fetchCountryFlag();
    }, [countryCode]);

    return (
        <div>
            {flagUrl ? (
                <img src={flagUrl} alt={`Flag of ${countryCode}`} style={{ width: '64px', height: 'auto' }} />
            ) : (
                <p>Loading country flag...</p>
            )}
        </div>
    );
};

export default CountryFlag;
