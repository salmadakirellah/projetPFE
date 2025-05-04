import Header from "../components/common/Header";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";

const UsersPage = () => {
	return (
		<div className="flex-1 overflow-auto relative z-10 bg-white min-h-screen text-gray-800">
			<Header title="Passer une commande" />

			<main className="max-w-5xl mx-auto py-10 px-6 lg:px-10 bg-gray-100 rounded-xl shadow-lg">
				<UserActivityHeatmap />
			</main>
		</div>
	);
};

export default UsersPage;
