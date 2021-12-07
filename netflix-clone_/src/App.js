import React from 'react';
import Home from './components/Home';
import LoginScreen from './components/LoginScreen'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MovieDetails from './components/MovieDetails';

function App() {

  const user = true;

  return (
    <div className="App">
      <Router>
        {!user ? <LoginScreen /> :
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/:id">
              <MovieDetails />
            </Route>
          </Switch>
        }

      </Router>
    </div>
  );
}

export default App;