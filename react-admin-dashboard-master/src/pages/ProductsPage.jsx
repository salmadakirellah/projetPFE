import Header from "../components/common/Header";
import ListProducts from "../components/products/ListeProducts";
import AdminLayout from "../Layouts/AdminLayout";

const ProductsPage = () => {
	return (
		<>
			<Header title="Products" />
			<main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
				<ListProducts />
			</main>
		</>
	);
};

export default ProductsPage;
