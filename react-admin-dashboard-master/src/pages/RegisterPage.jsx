import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Pour effectuer des appels API

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("client"); // Par défaut, c'est un client
    const [nom, setNom] = useState(""); // Nouveau champ
    const [adresse, setAdresse] = useState(""); // Nouveau champ pour Client
    const [telephone, setTelephone] = useState(""); // Nouveau champ pour Client
    const [typeCultures, setTypeCultures] = useState(""); // Nouveau champ pour Client
    const [vehiculeAffecte, setVehiculeAffecte] = useState(""); // Nouveau champ pour Chauffeur
    const [disponibilite, setDisponibilite] = useState(false); // Nouveau champ pour Chauffeur
    const [image, setImage] = useState(""); // Champ pour l'image (URL)
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const registerEndpoint =
                userType === "client"
                    ? "http://localhost:8083/auth/register/client"
                    : "http://localhost:8083/auth/register/chauffeur";

            const requestData =
                userType === "client"
                    ? {
                          nom,
                          username,
                          email,
                          password,
                          adresse,
                          telephone,
                          typeCultures,
                          image, // Ajout du champ image
                      }
                    : {
                          nom,
                          username,
                          email,
                          password,
                          vehiculeAffecte,
                          disponibilite,
                          image, // Ajout du champ image
                      };

            const response = await axios.post(registerEndpoint, requestData);

            // Si l'inscription réussie, rediriger vers la page de login
            navigate("/login");
        } catch (error) {
            alert(error.response?.data || "Error during registration");
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: `url('https://img.freepik.com/photos-gratuite/detail-usine-riz-au-coucher-du-soleil-valence-plantation-floue-grains-riz-dans-graines-plantes_181624-25838.jpg?semt=ais_hybrid&w=740')`,
            }}
        >
            <header className="absolute top-0 left-0 w-full bg-transparent text-white flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ32lXCHehh_QxHc-j7urwuwtC5d3qnsIF-mw&s"
                        alt="OCP Logo"
                        className="w-12 h-12 rounded-full bg-white p-1"
                    />
                    <h1 className="text-xl font-bold">OCP Platform</h1>
                </div>

                <nav className="space-x-6 text-sm">
                    <a href="#about" className="hover:text-green-400">About</a>
                    <a href="#strategy" className="hover:text-green-400">Strategy</a>
                    <a href="#products" className="hover:text-green-400">Produits</a>
                    <a href="#conseils" className="hover:text-green-400">Conseils</a>
                    <a href="/login">
                        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
                            Connexion
                        </button>
                    </a>
                    <a href="/register">
                        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
                            Inscription
                        </button>
                    </a>
                </nav>
            </header>

            <div className="flex justify-center items-center h-screen bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-md shadow-lg w-11/12 sm:w-96 md:w-104">
                    <h2 className="text-2xl mb-6 text-center">Register</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Ligne avec deux colonnes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-xs">Nom</label>
                                <input
                                    type="text"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-xs">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-xs">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-xs">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Champs conditionnels pour Client */}
                        {userType === "client" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-xs">Adresse</label>
                                    <input
                                        type="text"
                                        value={adresse}
                                        onChange={(e) => setAdresse(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-xs">Téléphone</label>
                                    <input
                                        type="text"
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-xs">Type de Cultures</label>
                                    <input
                                        type="text"
                                        value={typeCultures}
                                        onChange={(e) => setTypeCultures(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Champs conditionnels pour Chauffeur */}
                        {userType === "chauffeur" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                
                                <div>
                                    <label className="block text-gray-700 text-xs">Disponibilité</label>
                                    <select
                                        value={disponibilite}
                                        onChange={(e) => setDisponibilite(e.target.value === "true")}
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    >
                                        <option value="true">Disponible</option>
                                        <option value="false">Indisponible</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Champ URL pour l'image */}
                        <div>
                            <label className="block text-gray-700 text-xs">Image URL</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="URL de l'image"
                                required
                            />
                        </div>

                        {/* Choix du rôle (placé après l'image) */}
                        <div>
                            <label className="block text-gray-700 text-xs">Choisir le rôle</label>
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                            >
                                <option value="client">Client</option>
                                <option value="chauffeur">Chauffeur</option>
                            </select>
                        </div>

                        <div>
                            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md text-xs">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-3 text-center">
                        <p className="text-xs">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-500">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
