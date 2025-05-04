import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListeVehicules = () => {
    const [vehicules, setVehicules] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8085/vehicules')
            .then((response) => setVehicules(response.data))
            .catch((error) => console.error("Erreur lors du chargement des véhicules :", error));
    }, []);

    const addNewVehicule = () => navigate('/admin/add-vehicule');
    const updateVehicule = (id) => navigate(`/admin/edit-vehicule/${id}`);
    const deleteVehiculeById = (id) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8085/vehicules/${id}`)
                .then(() => {
                    setVehicules((prevVehicules) => prevVehicules.filter(vehicule => vehicule.id !== id));
                })
                .catch((error) => console.error("Erreur lors de la suppression du véhicule :", error));
        }
    };

    const filteredVehicules = vehicules.filter((vehicule) =>
        vehicule.marque.toLowerCase().includes(search.toLowerCase()) ||
        vehicule.modele.toLowerCase().includes(search.toLowerCase()) ||
        vehicule.immatriculation.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Liste des Véhicules</h2>
                <div className="flex space-x-4 items-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                        onClick={addNewVehicule}
                    >
                        Ajouter un véhicule
                    </button>
                    <input
                        type="text"
                        placeholder="Chercher un véhicule..."
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
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Marque</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Modèle</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Immatriculation</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Disponibilité</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredVehicules.map((vehicule) => (
                            <tr key={vehicule.id}>
                                <td className="px-6 py-4 text-sm text-gray-800">{vehicule.marque}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{vehicule.modele}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{vehicule.immatriculation}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {vehicule.disponibilite ? "Disponible" : "Indisponible"}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        onClick={() => updateVehicule(vehicule.id)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => deleteVehiculeById(vehicule.id)}
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

export default ListeVehicules;
