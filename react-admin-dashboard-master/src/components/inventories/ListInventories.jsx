import React, { useEffect, useState } from 'react';
import { getInventories, deleteInventory } from "../../services/InventoryService";
import { useNavigate } from 'react-router-dom';

const ListInventories = () => {
    const [inventories, setInventories] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchInventories();
    }, []);

    const fetchInventories = () => {
        getInventories()
            .then((response) => setInventories(response.data))
            .catch((error) => console.error("Erreur lors du chargement des inventaires :", error));
    };

    const addNewInventory = () => navigate('/admin/add-inventory');
    const updateInventory = (id) => navigate(`/admin/edit-inventory/${id}`);

    const deleteInventoryById = (id) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet inventaire ?");
        if (confirmDelete) {
            deleteInventory(id)
                .then(() => fetchInventories())
                .catch((error) => console.error("Erreur lors de la suppression :", error));
        }
    };

    const filteredInventories = inventories.filter((inv) =>
        inv.skuCode.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Liste des Engrais</h2>
                <div className="flex space-x-4 items-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                        onClick={addNewInventory}
                    >
                        Ajouter un engrais
                    </button>
                    <input
                        type="text"
                        placeholder="Chercher un engrais..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 text-gray-800"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100"> {/* Changement de couleur de fond de l'entête */}
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Nom</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Quantité</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Taille</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Prix (MAD)</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredInventories.map((inv) => (
                            <tr key={inv.id}>
                                <td className="px-6 py-4 text-sm text-gray-800">{inv.skuCode}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{inv.quantity}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{inv.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{inv.taille}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{inv.prix}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {inv.image && (
                                        <img src={inv.image} alt="Produit" className="w-16 h-16 object-cover rounded" />
                                    )}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        onClick={() => updateInventory(inv.id)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => deleteInventoryById(inv.id)}
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

export default ListInventories;
