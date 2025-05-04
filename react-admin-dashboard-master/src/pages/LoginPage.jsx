import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8083/auth/login", {
                username,
                password,
            });

            const { token, username: loggedInUser, role } = response.data;

            // Stockage des infos en localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("username", loggedInUser);
            localStorage.setItem("role", role);

            // Redirection selon le rôle
            const normalizedRole = role?.toLowerCase();

            if (normalizedRole === "admin") {
                navigate("/admin/overview");
            } else if (normalizedRole === "client") {
                navigate("/client/overview");
            } else if (normalizedRole === "chauffeur") {
                navigate("/chauffeur/overview");
            } else {
                navigate("/not-authorized");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data || "Invalid credentials");
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

            <div className="flex justify-center items-center h-screen bg-black bg-opacity-40">
                <div className="bg-white p-8 rounded-md shadow-lg w-96">
                    <h2 className="text-2xl mb-6">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p>
                            Don't have an account?{" "}
                            <a href="/register" className="text-blue-500">
                                Register here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
