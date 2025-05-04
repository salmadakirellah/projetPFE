import SidebarAdmin from "../components/common/SidebarAdmin";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <SidebarAdmin />

            <div className="flex-1 overflow-y-auto relative z-10">
                <Outlet /> {/* 🚀 Ici sera injecté ProductsPage, OverviewPage, etc. */}
            </div>
        </div>
    );
}

export default AdminLayout;
