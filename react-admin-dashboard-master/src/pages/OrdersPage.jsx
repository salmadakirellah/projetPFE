import Header from "../components/common/Header";
import ListeVehicules  from "../components/orders/ListeVehicules";

const orderStats = {
	totalOrders: "1,234",
	pendingOrders: "56",
	completedOrders: "1,178",
	totalRevenue: "$98,765",
};

const OrdersPage = () => {
	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Orders"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				 

				<ListeVehicules />
			</main>
		</div>
	);
};
export default OrdersPage;
