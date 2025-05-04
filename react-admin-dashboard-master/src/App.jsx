import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import ProductComponent from "./components/products/ProductComponent";
import ListInventories from "./components/inventories/ListInventories";
import InventoryComponent from "./components/inventories/InventoryComponent";
import ClientComponent from "./components/sales/ClientComponent";
import ChauffeurComponent from "./components/sales/ChauffeurComponent";
import VehiculeComponent from "./components/orders/VehiculeComponent";
import SalesPage1 from "./pages/SalesPage1";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotAuthorized from "./pages/NotAuthorized";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminLayout from "./Layouts/AdminLayout";
import ClientLayout from "./Layouts/ClientLayout"; // Assurez-vous que ClientLayout est importé ici

function App() {
    const role = localStorage.getItem("role");

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <div className="relative z-10 flex-1 overflow-y-auto">
                <Routes>
                    {/* Pages publiques */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/not-authorized" element={<NotAuthorized />} />

                    {/* Routes Admin protégées */}
                    <Route path="/admin" element={
                        <ProtectedRoute allowedRoles={['admin']} userRole={role}>
                            <AdminLayout />
                        </ProtectedRoute>
                    }>
                        <Route path="overview" element={<OverviewPage />} />
                        <Route path="inventories" element={<ListInventories />} />
                        <Route path="add-inventory" element={<InventoryComponent />} />
                        <Route path="edit-inventory/:id" element={<InventoryComponent />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="sales" element={<SalesPage />} />
                        <Route path="sales1" element={<SalesPage1 />} />
                        <Route path="orders" element={<OrdersPage />} />
                        <Route path="add-client" element={<ClientComponent />} />
                        <Route path="edit-client/:id" element={<ClientComponent />} />
                        <Route path="add-chauffeur" element={<ChauffeurComponent />} />
                        <Route path="edit-chauffeur/:id" element={<ChauffeurComponent />} />
                        <Route path="add-vehicule" element={<VehiculeComponent />} />
                        <Route path="edit-vehicule/:id" element={<VehiculeComponent />} />
                    </Route>

                    {/* Routes Client protégées */}
                    <Route path="/client" element={
                        <ProtectedRoute allowedRoles={['client']} userRole={role}>
                            <ClientLayout />
                        </ProtectedRoute>
                    }>
                        <Route path="overview" element={<OverviewPage />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="produit/:id" element={<ProductComponent />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                    </Route>

                    {/* Autres routes privées (hors layout) */}
                    <Route path="/add-product" element={<ProductComponent />} />
                    <Route path="/edit-product/:id" element={<ProductComponent />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
