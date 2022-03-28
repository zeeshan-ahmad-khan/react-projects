import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Cart from './pages/Cart';
import Home from './pages/Home';
import Payment from './pages/Payment';

import Cards from './components/Cards';
import CardDetails from './components/CardDetails';
import { useSelector } from 'react-redux';

import './App.css';
import { useEffect } from 'react';

function App() {

  const uid = useSelector(state => state.auth.uid);
  // const cart = useSelector(state => state.cart);

  // useEffect(() => {
  //   localStorage.setItem(uid, JSON.stringify(cart))
  // }, [cart])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {uid &&
            <>
              <Route path='/cart' element={<Cart isCart={true} />} />
              <Route path='/superheroes' element={<Cards alignment="good" character="superheroes" isCart={false} />} />
              <Route path='/superheros:id' element={<CardDetails />} />
              <Route path='/supervillains' element={<Cards alignment="bad" character="supervillains" isCart={false} />} />
              <Route path='/supervillains:id' element={<CardDetails />} />
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