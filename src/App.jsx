import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import CategoryProduct from "./pages/CategoryProduct";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import OrderDetailsPages from "./pages/OrderDeatailsPages"
import OrdersPage from "./pages/OrderPage";

import MainLayout from "./layout/MainLayout";
import PaymentPage from"./pages/PaymentPage";

function App() {
  return (
      <Routes >
        <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element = {<MainLayout/>}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders/:orderId"element={<OrderDetailsPages />}/>
          <Route path="/orders"element={<OrdersPage />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/payment/result" element={<PaymentPage />} />

          <Route path="/categories" element={<Category/>}  />
          <Route path="/categories/:categoryId" element={<CategoryProduct/>} />
        </Route>


      </Routes>
  );
}

export default App;