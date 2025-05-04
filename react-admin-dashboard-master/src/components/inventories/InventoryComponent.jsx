import React, { useEffect, useState } from 'react';
import { addInventory, getInventory, updateInventory } from "../../services/InventoryService";
import { useNavigate, useParams } from 'react-router-dom';

const InventoryComponent = () => {
    const [skuCode, setSkuCode] = useState('');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');
    const [taille, setTaille] = useState('');
    const [prix, setPrix] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getInventory(id)
                .then((response) => {
                    const data = response.data;
                    setSkuCode(data.skuCode);
                    setQuantity(data.quantity);
                    setType(data.type || '');
                    setTaille(data.taille || '');
                    setPrix(data.prix || '');
                    setImage(data.image || '');
                })
                .catch((error) => console.error("Erreur chargement inventaire :", error));
        }
    }, [id]);

    const saveInventory = async (e) => {
        e.preventDefault();
        const inventory = { skuCode, quantity, type, taille, prix, image };

        try {
            if (id) {
                await updateInventory(id, inventory);
            } else {
                await addInventory(inventory);
            }
            navigate('/admin/inventories', { replace: true });
        } catch (error) {
            console.error("Erreur sauvegarde inventaire :", error);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                    {id ? 'Modifier l\'Inventaire' : 'Ajouter un Inventaire'}
                </h2>
                <form onSubmit={saveInventory}>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Nom d'engrais:</label>
                        <input
                            type='text'
                            required
                            value={skuCode}
                            onChange={(e) => setSkuCode(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Quantité:</label>
                        <input
                            type='number'
                            required
                            min='0'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Type:</label>
                        <input
                            type='text'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Taille:</label>
                        <input
                            type='text'
                            value={taille}
                            onChange={(e) => setTaille(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Prix (MAD):</label>
                        <input
                            type='number'
                            step='0.01'
                            value={prix}
                            onChange={(e) => setPrix(e.target.value)}
                            className='w-full p-2 border rounded bg-gray-50 text-gray-900'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 block mb-1'>Image URL:</label>
                        <input
                            type='url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
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

export default InventoryComponent;
