import React, { Component } from 'react';
import './App.css';
import Snake from './Snake';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Snake/>
        </header>
      </div>
    );
  }
}

export default App;
