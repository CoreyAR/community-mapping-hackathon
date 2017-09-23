// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './containers/home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div>
          <h2>Nashville Resource Map</h2>
            <p className="description">A prototype app to help people identify areas of Nashville with the ammenities they need.</p>
          </div>
          <a href="https://github.com/CoreyAR/community-mapping-hackathon"><img src={require('./images/github-logo.png')} className="App-logo" alt="logo" /></a>
        </div>
        <Home />
      </div>
    );
  }
}

export default App;