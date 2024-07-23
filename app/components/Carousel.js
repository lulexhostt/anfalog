// components/Carousel.js
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../carousel.module.css'; // Import CSS module

import ee from '../../public/eetrack.png';
import eetrack2 from '../../public/eetrack2.png';
import eetrack3 from '../../public/eetrack3.png';
import eetrack4 from '../../public/eetrack4.png';
import eetrack5 from '../../public/eetrack5.png';



export default function Carousel() {
    const [logos, setLogos] = useState([]);

    useEffect(() => {
        const logosArray = [
            { src: ee, alt: 'eetrack' },
            { src: eetrack2, alt: 'eetrack2' },
            { src: eetrack3, alt: 'eetrack3' },
            { src: eetrack4, alt: 'eetrack4' },
            { src: eetrack5, alt: 'eetrack5' },
            
            

        ];
        setLogos(logosArray);
    }, []);

    return (
        <div className="w-full overflow-hidden ">
            <div className="w-full overflow-hidden">
                <div className={`w-full flex space-x-4 ${styles['animate-scrolling']}`}>
                    {logos.map((logo, index) => (
                        <div key={index} className="flex-none">
                            <Image src={logo.src} alt={logo.alt} height={89} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
