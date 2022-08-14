import Category from './components/Category'
import Products from './components/Products'
import Home from './components/Home'
import Navigation from './components/Navi'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       STOK TAKİBİ
     </h3>

     <Navigation/>

     <Routes>
       <Route path='/' element={<Home/>} exact/>
       <Route path='/Category' element={<Category/>}/>
       <Route path='/Products' element={<Products/>}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
