import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import './App.css';
import Layout from './Layout/Layout';
import Create from './pages/Create';
import Chats from './pages/Chats';
import Home from './pages/Home';
import { AuthContext } from './context/authContext';

function App() {

  const { state } = useContext(AuthContext);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          {state.uid &&
            <>
              <Route path='/create' element={<Create />} />
              <Route path='/chats' element={<Chats />} />
            </>
          }
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
