import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Figures from './pages/Figures';
import Posters from './pages/Posters';
import Plushies from './pages/Plushies';
import Replicas from './pages/Replicas';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Accessories from './pages/Accessories';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <>
     <Navbar/>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/figures" element={<Figures />} />
        <Route exact path="/posters" element={<Posters />} />
        <Route exact path="/plushies" element={<Plushies />} />
        <Route exact path="/replicas" element={<Replicas />} />
        <Route exact path="/accessories" element={<Accessories />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
