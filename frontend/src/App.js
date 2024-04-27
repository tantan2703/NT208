import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import ChatPage from './Pages/ChatPage';
import Footer from './Components/Footer/Footer';
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup';
import UserProfile from './Pages/UserProfile';
import jeremybudimanunsplash from './Components/Assets/jeremy-budiman-unsplash.jpg' 


function App() {
  return (
    <div >
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/watches' element={<ShopCategory banner={jeremybudimanunsplash} />}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} />}/>
        <Route path='/kids' element={<ShopCategory banner={kids_banner} />}/>
        <Route path='product'>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/chatpage' element={<ChatPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile/:activepage' element={<UserProfile/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
