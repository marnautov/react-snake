import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Snake from './Snake';
import DashBoard from './Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <Router>
            <div>
              <Route path="/" exact component={Snake} />
              <Route path="/dashboard" component={DashBoard} />
            </div>
          </Router>


        </header>
      </div>
    );
  }
}

export default App;
