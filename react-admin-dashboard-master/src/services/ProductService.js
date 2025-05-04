import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8084/api/product';

// Récupérer tous les produits
export const getProducts = () => axios.get(REST_API_BASE_URL);

// Ajouter un produit
export const addProduct = (product) => {
    return axios.post(REST_API_BASE_URL, product);
};

export const getProduct=(productId)=> axios.get(REST_API_BASE_URL + '/'+ productId);
export const updateProduct = (id, product) => {
    return axios.put(`${REST_API_BASE_URL}/${id}`, product);
};
export const deleteProduct = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/${id}`);
};