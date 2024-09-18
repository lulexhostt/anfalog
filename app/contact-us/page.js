// app/contact-us/page.js

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import "../globals.css";

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // Added state for success message
    const router = useRouter(); // For navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(''); // Clear success message before new submission

        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle success
                setSuccessMessage('Message received, Expect a Response'); // Set success message
                setName('');
                setEmail('');
                setMessage('');
                // Optionally, redirect or perform other actions
                // router.push('/thank-you');
            } else {
                // Handle errors
                setError(data.error || 'An unexpected error occurred.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative w-full h-screen bg-center">
            <nav className="fixed top-0 left-0 w-11/12 z-20 bg-[#0F248A] px-8 lg:px-14 py-2 ml-5 mr-5 lg:mr-[55px] lg:ml-[80px] mt-4 rounded-full">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white font-bold text-lg">
                        <Link href="https://anfashlogistics.nl">
                            <img src="/logo.png" alt="Logo" className="h-12 rounded-full" />
                        </Link>
                    </div>
                    <div className="hidden lg:flex space-x-6">
                        <Link href="https://anfashlogistics.nl" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00]">Home</Link>
                        <Link href="https://anfashlogistics.nl/who-we-are" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00]">Who we are</Link>
                        <Link href="https://anfashlogistics.nl/operations" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00]">Operations</Link>
                        <Link href="https://anfashlogistics.nl/terminals" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00]">Terminals</Link>
                        <Link href="https://anfashlogistics.nl/sustainability" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00]">Sustainability</Link>
                        <Link href="https://anfashlogistics.nl/safety" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00]">Safety</Link>
                        <Link href="/contact-us" className="text-[#FF6F00] font-bold text-sm hover:text-[#ff6f00f1]">Contact</Link>
                        <Link href="/" className="text-[#FF6F00] text-sm font-bold">Vessel Tracking</Link>
                    </div>
                    <div className="lg:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                            <div className="space-y-2">
                                <span className="block w-6 h-0.5 bg-slate-400"></span>
                                <span className="block w-6 h-0.5 bg-slate-400"></span>
                            </div>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div
                        className={`lg:hidden absolute top-0 left-0 right-0 bg-[#0F248A] bg-opacity-90 z-50 p-4  rounded-3xl   transition-all duration-500 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                            }`}
                    >
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 text-xl absolute top-4 right-4 hover:text-[#FF6F00]">
                            ✕
                        </button>
                        <div className="flex flex-col items-start p-4 space-y-4 mt-8 gap-y-1">
                            <Link href="https://anfashlogistics.nl" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00] py-2" onClick={handleLinkClick}>Home</Link>
                            <Link href="https://anfashlogistics.nl/who-we-are" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00] py-2" onClick={handleLinkClick}>Who we are</Link>
                            <Link href="https://anfashlogistics.nl/operations" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00] py-2" onClick={handleLinkClick}>Operations</Link>
                            <Link href="https://anfashlogistics.nl/terminals" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00] py-2" onClick={handleLinkClick}>Terminals</Link>
                            <Link href="https://anfashlogistics.nl/sustainability" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00] py-2" onClick={handleLinkClick}>Sustainability</Link>
                            <Link href="https://anfashlogistics.nl/safety" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00] py-2" onClick={handleLinkClick}>Safety</Link>
                            <Link href="/contact-us" className="text-[#FF6F00] font-normal text-sm hover:text-[#FF6F00] py-2" onClick={handleLinkClick}>Contact</Link>
                            <Link href="/" className="text-[#FF6F00] text-sm font-bold py-2" onClick={handleLinkClick}>Vessel Tracking</Link>
                        </div>
                    </div>
                )}
            </nav>

            <div className="fixed top-0 left-0 w-full h-[500px] z-0">
                <Image
                    src="/contact.png"
                    alt="Contact Background"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                />
            </div>
            <div className="relative container mx-auto p-2 pt-24 min-h-screen z-10 rounded-lg ">
                <div className='flex flex-col mt-[400px] bg-white gap-8 rounded-t-3xl pb-24 p-10'>
                    <p className='text-indigo-600 text-4xl font-extrabold'>Connect with Us</p>
                    <p className='text-indigo-600 text-xl font-medium'>Next to our strategically located terminals in Europe and the United States, we have our
                        headquarters in Rotterdam, the Netherlands, and maintain a regional office in Houston, Texas.
                        Our team is here to accommodate you. Feel free to send us an email or give us a call with your
                        thoughts and questions. We look forward to connecting with you.
                    </p>
                </div>
                <div className="flex  flex-col lg:flex-row items-center lg:items-start justify-center bg-white w-full">
                    <div className='flex flex-col w-full lg:w-1/2 gap-8 text-indigo-600 text-xl font-medium p-10 '>
                        <h1 className="text-indigo-600 text-4xl font-extrabold">Contact Us</h1>
                        <p className="text-xl font-medium ">
                            For any commercial requests, please fill out our commercial form. Our commercial team will contact
                            you as soon as possible
                        </p>
                        <p>
                             <b>Head Office - Netherland:</b>
                            <br />
                            Anfash Logistics BV
                            <br />
                            KVK Number: 93428251
                            <br />
                            De Sperwer 45
                            <br />
                            8239AH Lelystad,
                            <br />
                            Netherlands
                        </p>
                        <p>
                        Phone: +31 686315743
                            <br />
                            Email: storage@anfashlogistics.nl
                        </p>

                        <p>
                        <b>Houston Branch:</b>
                            <br />
                            Anfash Logistics BV
                            <br />
                            Phone: +1 (713) 769 4036
                           
                           
                        </p>

                        <p>
                        <b>TTM Office For Buyer (Meeting at Anfash Logistics B.V Tank Farm)</b>
                            <br />
                            Walter Kurka
                            <br />
                            PO Box 362
                            <br />
                            69335 Vince Road
                            <br />
                            Anchor Point, Alaska 99556
                            <br />
                            907-299-5074, (desk phone)
                           
                           
                        </p>
                        
                    </div>

                    <div className='bg-white w-full lg:w-1/2 mt-10  '>
                        <form className="w-full max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-lg border" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="5"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="flex lg:flex-row flex-col items-center justify-between lg:gap-0 gap-5">
                                <button
                                    className="bg-black hover:bg-slate-800 text-white text-sm py-4 px-6 rounded-full focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                                {successMessage && (
                                    <p className="ml-4 text-green-500 text-sm">{successMessage}</p> // Display success message
                                )}
                            </div>
                            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                        </form>
                    </div>
                </div>
                <div className="mt-10 bg-slate-100 rounded-t-3xl">
                    <h2 className="text-indigo-600 text-xl font-semibold px-8 py-2">Find Us on the Map</h2>
                    <div className="mt-4" style={{ overflow: 'hidden', resize: 'none', width: '100%', height: '400px' }}>
                        <div id="canvas-for-googlemap" style={{ height: '100%', width: '100%' }}>
                            <iframe
                                style={{ height: '100%', width: '100%', border: '0' }}
                                frameBorder="0"
                                src="https://www.google.com/maps/embed/v1/place?q=De+Sperwer,+De+Sperwer,+Lelystad,+Netherlands&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                                allowFullScreen
                                aria-hidden="false"
                                tabIndex="0"
                                title="Map Location"
                            ></iframe>
                        </div>
                        <a className="from-embedmap-code" href="https://www.bootstrapskins.com/themes" id="authorize-maps-data">
                            premium bootstrap themes
                        </a>
                        <style jsx>{`
                            #canvas-for-googlemap .text-marker {}
                            .map-generator {
                                max-width: 100%;
                                max-height: 100%;
                                background: none;
                            }
                        `}</style>
                    </div>
                    <div className="text-white font-bold text-lg mt-20 ">
                        <Link href="https://anfashlogistics.nl">
                            <img src="/contactImage.png" alt="Logo" className="h-full w-full rounded-b-3xl" />
                        </Link>
                    </div>



                </div>
                
            </div>
            
        </div>
    );
};

export default ContactUs;
