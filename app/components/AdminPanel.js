"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Modal from '../components/Modal'; // Import custom Modal component
import './AdminPanel.css'; // Import custom CSS

const AdminPanel = () => {
    const [vessels, setVessels] = useState([]);
    const [error, setError] = useState(null);
    const [newVessel, setNewVessel] = useState({
        vessel_name: '',
        reported_destination: '',
        map_icon_url: '',
        draught: '',
        latitude: '',
        longitude: '',
        navigation_status: '',
        detailed_vessel_type: '',
        ais_transponder_class: '',
        call_sign: '',
        ais_source: '',
        general_vessel_type: '',
        departure_port: '',
        arrival_port: '',
        speed: '',
        course: '',
        true_heading: '',
        estimated_time_of_arrival: '',
        matched_destination: '',
        flag_url: '',
        vessel_image_url: '',
        imo_number: '',
        mmsi_number: '',
        vessel_movement: '20',
        vessel_length: '',
        vessel_width: '',
        arrival_portflag_url: ''
    });
    const [editVessel, setEditVessel] = useState({});
    const [modalType, setModalType] = useState(null);
    const router = useRouter();

    const fetchVessels = async () => {
        const { data, error } = await supabase
            .from('vessels')
            .select('*');

        if (error) {
            setError(error.message);
        } else {
            setVessels(data);
        }
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            setError(error.message);
        } else {
            router.push('/login');
        }
    };

    const handleFileChange = async (e, field, setStateCallback) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const filePath = `${Date.now()}_${file.name}`; // Generate a unique file path
                const { data, error } = await supabase
                    .storage
                    .from('vessel-images')
                    .upload(filePath, file);
    
                if (error) {
                    throw error; // Throw error to be caught below
                }
    
                // Fetch the public URL for the uploaded file
                const { data: publicURLData, error: urlError } = supabase
                    .storage
                    .from('vessel-images')
                    .getPublicUrl(filePath);
    
                if (urlError) {
                    throw urlError;
                }
    
                const publicURL = publicURLData.publicUrl;
    
                // Update state with the public URL
                setStateCallback(prevState => ({ ...prevState, [field]: publicURL }));
    
            } catch (error) {
                console.error('Error handling file change:', error.message);
                setError(error.message);
            }
        }
    };

    const handleCreateVessel = async (e) => {
        e.preventDefault();
        setError(null);

        const formattedVessel = {
            ...newVessel,
            draught: parseFloat(newVessel.draught),
            latitude: parseFloat(newVessel.latitude),
            longitude: parseFloat(newVessel.longitude),
            speed: parseFloat(newVessel.speed),
            course: parseFloat(newVessel.course),
            true_heading: parseInt(newVessel.true_heading, 10),
            imo_number: parseInt(newVessel.imo_number, 10),
            mmsi_number: parseInt(newVessel.mmsi_number, 10),
            vessel_length: parseFloat(newVessel.vessel_length),
            vessel_width: parseFloat(newVessel.vessel_width)
        };

        const { data, error } = await supabase
            .from('vessels')
            .insert([formattedVessel]);

        if (error) {
            setError(error.message);
        } else {
            setNewVessel({
                vessel_name: '',
                reported_destination: '',
                map_icon_url: '',
                draught: '',
                latitude: '',
                longitude: '',
                navigation_status: '',
                detailed_vessel_type: '',
                ais_transponder_class: '',
                call_sign: '',
                ais_source: '',
                general_vessel_type: '',
                departure_port: '',
                arrival_port: '',
                speed: '',
                course: '',
                true_heading: '',
                estimated_time_of_arrival: '',
                matched_destination: '',
                flag_url: '',
                vessel_image_url: '',
                imo_number: '',
                mmsi_number: '',
                vessel_movement: '20',
                vessel_length: '',
                vessel_width: '',
                arrival_portflag_url: ''
            });
            setModalType(null);
            fetchVessels();
        }
    };

    const handleUpdateVessel = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const { id, ...formattedVessel } = {
                ...editVessel,
                draught: parseFloat(editVessel.draught),
                latitude: parseFloat(editVessel.latitude),
                longitude: parseFloat(editVessel.longitude),
                speed: parseFloat(editVessel.speed),
                course: parseFloat(editVessel.course),
                true_heading: parseInt(editVessel.true_heading, 10),
                imo_number: parseInt(editVessel.imo_number, 10),
                mmsi_number: parseInt(editVessel.mmsi_number, 10),
                vessel_length: parseFloat(editVessel.vessel_length),
                vessel_width: parseFloat(editVessel.vessel_width)
            };

            const { data, error } = await supabase
                .from('vessels')
                .update(formattedVessel)
                .eq('id', id);

            if (error) {
                throw error;
            }

            setEditVessel({});
            setModalType(null);
            fetchVessels();
        } catch (error) {
            console.error("Error updating vessel:", error);
            setError(error.message);
        }
    };

    const handleDeleteVessel = async (id) => {
        const { error } = await supabase
            .from('vessels')
            .delete()
            .eq('id', id);

        if (error) {
            setError(error.message);
        } else {
            fetchVessels();
        }
    };

    useEffect(() => {
        fetchVessels();
    }, []);

    return (
        <div className="admin-panel">
            <h1 className='adminText'>Admin Panel</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>

            <div className="dashboard">
                <div className="dashboard-item" onClick={() => setModalType('create')}>
                    <h2>Create Vessel Info</h2>
                </div>
                <div className="dashboard-item" onClick={() => setModalType('view')}>
                    <h2>View All Vessel Info</h2>
                </div>
            </div>

            {/* Create Vessel Modal */}
            <Modal
                isOpen={modalType === 'create'}
                onRequestClose={() => setModalType(null)}
            >
                <h2 className='createVessel'>Create New Vessel</h2>
                <form onSubmit={handleCreateVessel}>
                    <div className="form-group">
                        {Object.keys(newVessel ?? {}).map((key) => (
                            key !== 'vessel_image_url' && key !== 'map_icon_url' && key !== 'arrival_portflag_url' && key !== 'flag_url' && (
                                <div key={key}>
                                    <label className='labell'>{key.replace(/_/g, ' ')}</label>
                                    {key === 'vessel_movement' ? (
                                        <select
                                            value={newVessel[key]}
                                            onChange={(e) => setNewVessel({ ...newVessel, [key]: e.target.value })}
                                            required
                                        >
                                            <option value="20">20</option>
                                            <option value="40">40</option>
                                            <option value="60">60</option>
                                            <option value="80">80</option>
                                            <option value="100">100</option>
                                        </select>
                                    ) : (
                                        <input className='inputt'
                                            type={key === 'estimated_time_of_arrival' ? 'datetime-local' : 'text'}
                                            value={newVessel[key]}
                                            onChange={(e) => setNewVessel({ ...newVessel, [key]: e.target.value })}
                                            required
                                        />
                                    )}
                                </div>
                            )
                        ))}
                        <div>
                            <label>Vessel Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'vessel_image_url', setNewVessel)}
                            />
                        </div>
                        <div>
                            <label>Map Icon</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'map_icon_url', setNewVessel)}
                            />
                        </div>
                        <div>
                            <label>Flag Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'flag_url', setNewVessel)}
                            />
                        </div>
                        <div>
                            <label>Arrival Port Flag</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'arrival_portflag_url', setNewVessel)}
                            />
                        </div>
                    </div>
                    <button className='button2' type="submit">Create Vessel</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </Modal>

            {/* Edit Vessel Modal */}
            <Modal
                isOpen={modalType === 'edit'}
                onRequestClose={() => setModalType(null)}
            >
                <h2 className='createVessel'>Edit Vessel</h2>
                <form onSubmit={handleUpdateVessel}>
                    <div className="form-group">
                        {Object.keys(editVessel ?? {}).map((key) => (
                            key !== 'id' && key !== 'vessel_image_url' && key !== 'map_icon_url' && key !== 'arrival_portflag_url' && key !== 'flag_url' && (
                                <div key={key}>
                                    <label className='labell'>{key.replace(/_/g, ' ')}</label>
                                    {key === 'vessel_movement' ? (
                                        <select
                                            value={editVessel[key]}
                                            onChange={(e) => setEditVessel({ ...editVessel, [key]: e.target.value })}
                                            required
                                        >
                                            <option value="20">20</option>
                                            <option value="40">40</option>
                                            <option value="60">60</option>
                                            <option value="80">80</option>
                                            <option value="100">100</option>
                                        </select>
                                    ) : (
                                        <input className='inputt'
                                            type={key === 'estimated_time_of_arrival' ? 'datetime-local' : 'text'}
                                            value={editVessel[key]}
                                            onChange={(e) => setEditVessel({ ...editVessel, [key]: e.target.value })}
                                            required
                                        />
                                    )}
                                </div>
                            )
                        ))}
                        <div>
                            <label>Vessel Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'vessel_image_url', setEditVessel)}
                            />
                        </div>
                        <div>
                            <label>Map Icon</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'map_icon_url', setEditVessel)}
                            />
                        </div>
                        <div>
                            <label>Flag Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'flag_url', setEditVessel)}
                            />
                        </div>
                        <div>
                            <label>Arrival Port Flag</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'arrival_portflag_url', setEditVessel)}
                            />
                        </div>
                    </div>
                    <button className='button2' type="submit">Update Vessel</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </Modal>

            {/* View All Vessels */}
            {modalType === 'view' && (
                <div className="vessel-list">
                    <h2>All Vessels</h2>
                    {vessels.map(vessel => (
                        <div key={vessel.id} className="vessel-item">
                            <h3>{vessel.vessel_name} ( {vessel.imo_number} )</h3>
                            <button className='editButtonn' onClick={() => { setEditVessel(vessel); setModalType('edit'); }}>
                                Edit
                            </button>
                            <button className='deleteButtonn' onClick={() => handleDeleteVessel(vessel.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
