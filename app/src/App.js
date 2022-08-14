import Category from "./components/Category";
import Product from "./components/Product";
import Navi from "./components/Navi";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">STOK TAKİBİ</h3>

        <Navi />
        <Routes>
          <Route path="/Category" element={<Category />} />
          <Route path="/Product" element={<Product />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
