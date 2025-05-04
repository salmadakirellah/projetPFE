import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListeChauffeurs = () => {
    const [chauffeurs, setChauffeurs] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8083/admin/chauffeurs')
            .then((response) => setChauffeurs(response.data))
            .catch((error) => console.error("Erreur lors du chargement des chauffeurs :", error));
    }, []);

    const addNewChauffeur = () => navigate('/admin/add-chauffeur');
    const updateChauffeur = (id) => navigate(`/admin/edit-chauffeur/${id}`);
    const deleteChauffeurById = (id) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce chauffeur ?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8083/admin/chauffeurs/${id}`)
                .then(() => {
                    setChauffeurs((prevChauffeurs) => prevChauffeurs.filter(chauffeur => chauffeur.id !== id));
                })
                .catch((error) => console.error("Erreur lors de la suppression du chauffeur :", error));
        }
    };

    const filteredChauffeurs = chauffeurs.filter((chauffeur) =>
        chauffeur.nom.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Liste des Chauffeurs</h2>
                <div className="flex space-x-4 items-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                        onClick={addNewChauffeur}
                    >
                        Ajouter un chauffeur
                    </button>
                    <input
                        type="text"
                        placeholder="Chercher un chauffeur..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 text-gray-800"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Photo</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Nom</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Email</th>
                             
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Disponibilité</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredChauffeurs.map((chauffeur) => (
                            <tr key={chauffeur.id}>
                                <td className="px-6 py-4">
                                    {chauffeur.image ? (
                                        <img
                                            src={chauffeur.image}  // Utilisation du champ 'image' du backend
                                            alt="Chauffeur"
                                            className="w-12 h-12 rounded-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'default-image.png'; // Lien vers une image par défaut
                                            }}
                                        />
                                    ) : (
                                        <span className="text-gray-400">Pas d'image</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800">{chauffeur.nom}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{chauffeur.username}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{chauffeur.email}</td>
                                 
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {chauffeur.disponibilite ? "Disponible" : "Indisponible"}  {/* Vérification de la disponibilité */}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        onClick={() => updateChauffeur(chauffeur.id)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => deleteChauffeurById(chauffeur.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListeChauffeurs;
