import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: `url('https://img.freepik.com/photos-gratuite/detail-usine-riz-au-coucher-du-soleil-valence-plantation-floue-grains-riz-dans-graines-plantes_181624-25838.jpg?semt=ais_hybrid&w=740')`,
            }}
        >
            {/* Barre de navigation transparente */}
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

                    {/* Connexion et Inscription comme boutons dans la barre de navigation */}
                    <Link to="/login">
                        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
                            Connexion
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
                            Inscription
                        </button>
                    </Link>
                </nav>
            </header>

            {/* Contenu principal centré sans boutons */}
            <div className="flex items-center justify-center min-h-screen text-center text-white bg-black bg-opacity-40">
                <div className="p-10 rounded-lg">
                    <h2 className="text-5xl font-bold mb-4">Bienvenue sur la plateforme OCP</h2>
                    <p className="text-lg mb-6">Optimisez votre agriculture avec notre technologie</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
