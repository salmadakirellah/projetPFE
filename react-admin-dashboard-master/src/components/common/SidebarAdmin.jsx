import {
    BarChart2,
    DollarSign,
    Menu,
    Settings,
    ShoppingBag,
    ShoppingCart,
    TrendingUp,
    Users,
    Package,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

// Navigation items
const SIDEBAR_ITEMS = [
    {
        name: "Overview",
        icon: BarChart2,
        color: "#6366f1",
        href: "/admin/overview",
    },
    {
        name: "Engrais",
        icon: Package,
        color: "#F472B6",
        href: "/admin/inventories", // ✅ CORRIGÉ
    },
    {
        name: "Uitilisateurs",
        icon: DollarSign,
        color: "#10B981",
        href: "/admin/users", // ✅ CORRIGÉ
        hasSubMenu: true,
        subMenu: [
            { name: "Clients", href: "/admin/sales" },
            { name: "Chauffeurs", href: "/admin/sales1" },
        ],
    },
    {
        name: "Vehicules",
        icon: ShoppingCart,
        color: "#F59E0B",
        href: "/admin/orders",
    },
];

const SidebarAdmin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openDeliveries, setOpenDeliveries] = useState(false); // État pour gérer l'ouverture du sous-menu "Deliveries"

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
                isSidebarOpen ? "w-64" : "w-20"
            }`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className="h-full bg-white bg-opacity-80 backdrop-blur-md p-4 flex flex-col border-r border-gray-300 text-gray-900">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors max-w-fit"
                >
                    <Menu size={24} />
                </motion.button>

                <nav className="mt-8 flex-grow">
                    {SIDEBAR_ITEMS.map((item) => {
                        if (item.hasSubMenu) {
                            return (
                                <div key={item.name}>
                                    <motion.div
                                        className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors mb-2 cursor-pointer"
                                        onClick={() => setOpenDeliveries(!openDeliveries)} // Toggle pour afficher/masquer le sous-menu
                                    >
                                        <item.icon
                                            size={20}
                                            style={{ color: item.color, minWidth: "20px" }}
                                        />
                                        <AnimatePresence>
                                            {isSidebarOpen && (
                                                <motion.span
                                                    className="ml-4 whitespace-nowrap"
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ duration: 0.2, delay: 0.3 }}
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <AnimatePresence>
                                        {openDeliveries && (
                                            <motion.div
                                                className="pl-6"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item.subMenu.map((subItem) => (
                                                    <Link key={subItem.href} to={subItem.href}>
                                                        <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors mb-2">
                                                            <DollarSign size={20} style={{ color: "#10B981" }} />
                                                            <AnimatePresence>
                                                                {isSidebarOpen && (
                                                                    <motion.span
                                                                        className="ml-4 whitespace-nowrap"
                                                                        initial={{ opacity: 0, width: 0 }}
                                                                        animate={{ opacity: 1, width: "auto" }}
                                                                        exit={{ opacity: 0, width: 0 }}
                                                                        transition={{ duration: 0.2, delay: 0.3 }}
                                                                    >
                                                                        {subItem.name}
                                                                    </motion.span>
                                                                )}
                                                            </AnimatePresence>
                                                        </motion.div>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        return (
                            <Link key={item.href} to={item.href}>
                                <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors mb-2">
                                    <item.icon
                                        size={20}
                                        style={{ color: item.color, minWidth: "20px" }}
                                    />
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                className="ml-4 whitespace-nowrap"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: "auto" }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.2, delay: 0.3 }}
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </motion.div>
    );
};

export default SidebarAdmin;
