import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Cryptocurrencies from './pages/Cryptocurrencies'
import Exchanges from './pages/Exchanges'
import News from './pages/News'
import Coin from './pages/Coin';
import Layout from './UI/Layout';
import useFetch from './utilities/useFetch';

function App() {

  const urls = {
    home: "coins"
  }

  const { reqData } = useFetch(urls.home);

  return (
    <div className="app">
      <Layout>
        <Routes>
          <Route path='/' element={<Home url={urls.home} />} />
          <Route path='/cryptocurrencies' element={<Cryptocurrencies cryptocoins={reqData?.coins} url={urls.home} />} />
          <Route path='/cryptocoin/:coinId' element={<Coin />} />
          <Route path='/news' element={<News />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
