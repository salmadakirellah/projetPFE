import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ChauffeurComponent = () => {
    const [nom, setNom] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vehiculeAffecte, setVehiculeAffecte] = useState('');
    const [disponibilite, setDisponibilite] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8083/admin/chauffeurs/${id}`)
                .then((response) => {
                    const data = response.data;
                    setNom(data.nom);
                    setUsername(data.username);
                    setEmail(data.email);
                    setVehiculeAffecte(data.vehiculeAffecte);
                    setDisponibilite(data.disponibilite);
                    setImageUrl(data.image || '');  // Utilisation de 'image' pour l'image
                })
                .catch((error) => console.error("Erreur lors du chargement du chauffeur :", error));
        }
    }, [id]);

    const saveChauffeur = async (e) => {
        e.preventDefault();
        const chauffeur = { nom, username, email, password, vehiculeAffecte, disponibilite, image: imageUrl };

        try {
            if (id) {
                await axios.put(`http://localhost:8083/admin/chauffeurs/${id}`, chauffeur);
            } else {
                await axios.post('http://localhost:8083/admin/chauffeurs', chauffeur);
            }
            navigate('/admin/sales1', { replace: true });
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du chauffeur :", error);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                    {id ? 'Modifier le Chauffeur' : 'Ajouter un Chauffeur'}
                </h2>
                <form onSubmit={saveChauffeur}>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Nom :</label>
                        <input
                            type='text'
                            required
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Nom d'utilisateur :</label>
                        <input
                            type='text'
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Email :</label>
                        <input
                            type='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Mot de Passe :</label>
                        <input
                            type='password'
                            required={!id}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>URL de l'image :</label>
                        <input
                            type='text'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://exemple.com/photo.jpg"
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
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

export default ChauffeurComponent;
