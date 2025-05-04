import { motion } from "framer-motion";
import Header from "../components/common/Header";
import ListeClient  from "../components/sales/ListeClient";
 

const SalesPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Sales Dashboard' />

      {/* Add your sales statistics or other components here if needed */}
      <div className="p-6">
        <ListeClient />
      </div>
       
    </div>
  );
};

export default SalesPage;
