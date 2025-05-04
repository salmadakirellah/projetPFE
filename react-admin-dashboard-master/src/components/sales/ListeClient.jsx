import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SalesByCategoryChart = () => {
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8083/admin/clients')
            .then((response) => setClients(response.data))
            .catch((error) => console.error("Erreur lors du chargement des clients :", error));
    }, []);

    const addNewClient = () => navigate('/admin/add-client');
    const updateClient = (id) => navigate(`/admin/edit-client/${id}`);

    const deleteClientById = (id) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8083/admin/clients/${id}`)
                .then(() => {
                    setClients((prevClients) => prevClients.filter(client => client.id !== id));
                })
                .catch((error) => console.error("Erreur lors de la suppression du client :", error));
        }
    };

    const filteredClients = clients.filter((client) =>
        client.nom.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Liste des Clients</h2>
                <div className="flex space-x-4 items-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                        onClick={addNewClient}
                    >
                        Ajouter un client
                    </button>
                    <input
                        type="text"
                        placeholder="Chercher un client..."
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
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Nom</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Téléphone</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Adresse</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Type de Cultures</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredClients.map((client) => (
                            <tr key={client.id}>
                                <td className="px-6 py-4">
                                    {client.image ? (
                                        <img
                                            src={client.image}
                                            alt="Client"
                                            className="w-12 h-12 object-cover rounded-full"
                                        />
                                    ) : (
                                        <span className="text-gray-400 italic">Pas d'image</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800">{client.nom}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{client.username}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{client.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{client.telephone}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{client.adresse}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{client.typeCultures}</td>
                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        onClick={() => updateClient(client.id)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => deleteClientById(client.id)}
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

export default SalesByCategoryChart;
