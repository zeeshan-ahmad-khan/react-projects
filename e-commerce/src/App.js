import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Cart from './pages/Cart';
import Home from './pages/Home';
import Payment from './pages/Payment';

import Cards from './components/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import './App.css';
import { fetchCart } from './features/cartSlice';

function App() {

  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.auth);

  // console.log(cart);

  const addCartItemsToDB = async () => {
    if (user) {
      const response = await axios.put(`https://cardverse-179d7-default-rtdb.firebaseio.com/${user.uid}.json`, JSON.stringify(cart));

      sessionStorage.setItem("cart", JSON.stringify(response.data));
    }
  }

  useEffect(() => {
    addCartItemsToDB();
  }, [cart])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {user.uid &&
            <>
              <Route path='/cart' element={<Cart isCart={true} />} />
              <Route path='/superheroes' element={<Cards alignment="good" character="superheroes" isCart={false} />} />
              <Route path='/supervillains' element={<Cards alignment="bad" character="supervillains" isCart={false} />} />
              <Route path='/payment' element={<Payment />} />
            </>
          }
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;