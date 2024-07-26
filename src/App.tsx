import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GoodsDetailPage } from '@/pages/Goods/Detail';
import Wishlist from '@/pages/Wishlist';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/product/:id" element={<GoodsDetailPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
