import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MenuPage from "./pages/MenuPage";
import CreateMenuItem from "./pages/CreateMenuItem";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";


const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        {/* Menu Display Route */}
        <Route path="/" element={<MenuPage />} />

        {/* Admin Create Menu Item */}
        <Route path="/create-menu" element={<CreateMenuItem />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:id" element={<OrderSuccessPage />} />
        <Route path="/track-order/:id" element={<OrderTrackingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


