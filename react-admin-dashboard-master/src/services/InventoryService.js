import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8082/api/inventory';

// Récupérer tous les inventaires
export const getInventories = () => axios.get(REST_API_BASE_URL + '/all');

// Ajouter un inventaire
export const addInventory = (inventory) => {
    return axios.post(REST_API_BASE_URL, inventory);
};

// Récupérer un inventaire par ID
export const getInventory = (inventoryId) => axios.get(`${REST_API_BASE_URL}/${inventoryId}`);

// Mettre à jour un inventaire
export const updateInventory = (id, inventory) => {
    return axios.put(`${REST_API_BASE_URL}/${id}`, inventory);
};

// Supprimer un inventaire
export const deleteInventory = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/${id}`);
};

 