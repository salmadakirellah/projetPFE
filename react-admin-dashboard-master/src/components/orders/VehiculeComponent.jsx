import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const VehiculeComponent = () => {
    const [marque, setMarque] = useState('');
    const [modele, setModele] = useState('');
    const [immatriculation, setImmatriculation] = useState('');
    const [disponibilite, setDisponibilite] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8085/vehicules/${id}`)
                .then(response => {
                    const data = response.data;
                    setMarque(data.marque);
                    setModele(data.modele);
                    setImmatriculation(data.immatriculation);
                    setDisponibilite(data.disponibilite);
                })
                .catch(error => console.error("Erreur lors du chargement du véhicule :", error));
        }
    }, [id]);

    const saveVehicule = async (e) => {
        e.preventDefault();
        const vehicule = { marque, modele, immatriculation, disponibilite };

        try {
            if (id) {
                await axios.put(`http://localhost:8085/vehicules/${id}`, vehicule);
            } else {
                await axios.post('http://localhost:8085/vehicules', vehicule);
            }
            navigate('/admin/orders', { replace: true });
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du véhicule :", error);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                    {id ? 'Modifier le Véhicule' : 'Ajouter un Véhicule'}
                </h2>
                <form onSubmit={saveVehicule}>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Marque :</label>
                        <input
                            type='text'
                            required
                            value={marque}
                            onChange={(e) => setMarque(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Modèle :</label>
                        <input
                            type='text'
                            required
                            value={modele}
                            onChange={(e) => setModele(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Immatriculation :</label>
                        <input
                            type='text'
                            required
                            value={immatriculation}
                            onChange={(e) => setImmatriculation(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Disponibilité :</label>
                        <select
                            value={disponibilite}
                            onChange={(e) => setDisponibilite(e.target.value === 'true')}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        >
                            <option value='true'>Disponible</option>
                            <option value='false'>Indisponible</option>
                        </select>
                    </div>
                    <div className='flex space-x-4'>
                        <button
                            type='submit'
                            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition'
                        >
                            {id ? 'Mettre à jour' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VehiculeComponent;
