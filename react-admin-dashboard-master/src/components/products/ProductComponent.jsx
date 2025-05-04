import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInventory } from '../../services/InventoryService'; // Méthode pour récupérer un produit par ID

const ProductComponent = () => {
    const { id } = useParams();  // Récupère l'ID du produit dans l'URL
    const [product, setProduct] = useState(null); // État pour stocker les détails du produit
    const [loading, setLoading] = useState(true); // État pour afficher un message de chargement pendant la récupération des données

    useEffect(() => {
        // Récupérer le produit par son ID
        getInventory(id)
            .then((response) => {
                setProduct(response.data); // Mettre à jour l'état avec les données du produit
                setLoading(false); // L'API a répondu, nous arrêtons le chargement
            })
            .catch((error) => {
                console.error("Erreur lors du chargement du produit:", error);
                setLoading(false); // Arrêter le chargement en cas d'erreur
            });
    }, [id]); // Refaire l'appel à l'API lorsque l'ID change

    if (loading) return <p className="p-6 text-center text-gray-500">Chargement...</p>; // Affiche un message pendant le chargement des données

    if (!product) return <p className="p-6 text-center text-red-500">Produit non trouvé</p>; // Si aucun produit n'est trouvé

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            <img
                src={product.image}
                alt={product.skuCode}
                className="w-full h-64 object-cover rounded-xl mb-4"
            />
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{product.skuCode}</h2>
            <p className="text-lg text-gray-600 mb-2"><strong>Type :</strong> {product.type}</p>
            <p className="text-lg text-gray-600 mb-2"><strong>Taille :</strong> {product.taille}</p>
            <p className="text-lg text-gray-600 mb-2"><strong>Stock disponible :</strong> {product.quantity}</p>
            <p className="text-2xl font-bold text-green-700 mt-4">Prix unitaire : {product.prix} MAD</p>
        </div>
    );
};

export default ProductComponent;
