import React from 'react';

import { Counter } from './features/counter/Counter';
import NpmPackageSearch from './features/npmSearch/npmSearch'
import MatchPlayers from './features/matchPlayers/MatchPlayers'

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <header className="App-header">
            <Link to="/">Counter</Link>
            <Link to="/npm">NPM</Link>
            <Link to="/login">Login</Link>
            <Link to="/match">Match</Link>
          </header>
          <Switch>
            <Route path='/match' component={MatchPlayers} />

            <Route path="/npm" component={NpmPackageSearch} />
            <Route path="/login">
              <h1>Login</h1>
            </Route>
            <Route path="/" component={Counter} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
