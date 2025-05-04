import SidebarClient from "../components/common/SidebarClient";
import { Outlet } from "react-router-dom";

function ClientLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <SidebarClient />

            <div className="flex-1 overflow-y-auto relative z-10">
                <Outlet /> {/* 🚀 Ici sera injecté ProductsPage, OverviewPage, etc. */}
            </div>
        </div>
    );
}

export default ClientLayout;
