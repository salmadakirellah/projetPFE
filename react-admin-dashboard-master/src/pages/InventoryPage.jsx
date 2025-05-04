import Header from "../components/common/Header";
import ListInventories from "../components/inventories/ListInventories";

const InventoryPage = () => {
    return (
        <div className="flex-1 overflow-auto bg-gray-100 min-h-screen relative z-10">
            <Header title="Inventaire" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <ListInventories />
            </main>
        </div>
    );
};

export default InventoryPage;
