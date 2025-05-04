import React, { useEffect, useState } from 'react';
import { getInventories } from "../../services/InventoryService";
import { Link } from 'react-router-dom';

const ListProducts = () => {
    const [inventories, setInventories] = useState([]);
    const [filterType, setFilterType] = useState('Tous');

    useEffect(() => {
        getInventories()
            .then((response) => setInventories(response.data))
            .catch((error) => console.error("Erreur lors du chargement :", error));
    }, []);

    const types = ['Tous', ...new Set(inventories.map(inv => inv.type))];

    const filteredInventories = filterType === 'Tous'
        ? inventories
        : inventories.filter(inv => inv.type === filterType);

    return (
        <div className="p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Nos Produits</h2>

            <div className="flex justify-center mb-6 flex-wrap gap-3">
                {types.map(type => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 rounded-full border ${filterType === type ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border-gray-300'} hover:bg-green-700 hover:text-white transition`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredInventories.map((inv) => (
                    <Link to={`/client/produit/${inv.id}`} key={inv.id}>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition">
                            <img
                                src={inv.image}
                                alt={inv.skuCode}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{inv.skuCode}</h3>
                                <p className="text-gray-600 text-sm">Type : {inv.type}</p>
                                <p className="text-gray-600 text-sm">Taille : {inv.taille}</p>
                                <p className="text-gray-600 text-sm">Quantité dispo : {inv.quantity}</p>
                                <p className="text-green-700 font-bold mt-2">Prix : {inv.prix} MAD</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ListProducts;
