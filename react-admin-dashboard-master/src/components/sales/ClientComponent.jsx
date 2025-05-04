import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DailySalesTrend = () => {
    const [nom, setNom] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [adresse, setAdresse] = useState('');
    const [telephone, setTelephone] = useState('');
    const [typeCultures, setTypeCultures] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(''); // ➡️ AJOUT pour l'image

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8083/admin/clients/${id}`)
                .then((response) => {
                    const data = response.data;
                    setNom(data.nom);
                    setUsername(data.username);
                    setEmail(data.email);
                    setAdresse(data.adresse);
                    setTelephone(data.telephone);
                    setTypeCultures(data.typeCultures);
                    setImage(data.image); // ➡️ Charger l'image aussi
                })
                .catch((error) => console.error("Erreur lors du chargement du client :", error));
        }
    }, [id]);

    const saveClient = async (e) => {
        e.preventDefault();
        const client = { nom, username, email, password, adresse, telephone, typeCultures, image }; // ➡️ inclure image

        try {
            if (id) {
                await axios.put(`http://localhost:8083/admin/clients/${id}`, client);
            } else {
                await axios.post('http://localhost:8083/admin/clients', client);
            }
            navigate('/admin/sales', { replace: true });
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du client :", error);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                    {id ? 'Modifier le Client' : 'Ajouter un Client'}
                </h2>
                <form onSubmit={saveClient}>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                            placeholder="Laissez vide si vous ne souhaitez pas changer le mot de passe"
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Adresse :</label>
                        <input
                            type='text'
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Numéro de téléphone :</label>
                        <input
                            type='text'
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Type de cultures :</label>
                        <input
                            type='text'
                            value={typeCultures}
                            onChange={(e) => setTypeCultures(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Image (URL) :</label>
                        <input
                            type='text'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                            placeholder="Collez ici un lien d'image"
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

export default DailySalesTrend;
