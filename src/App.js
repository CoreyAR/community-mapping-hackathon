// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './containers/home'
import DataManager from './helpers/data'
const dm = new DataManager()

class App extends Component {
  constructor(props) {
    super(props)
    this.dataManager = new DataManager()
    this.state = {
      markerData: []
    }
  }

  componentWillMount() {
    this.setState({markerData: dm.markerData})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div>
          <h2>Immigrant Support System</h2>
            <p className="description">A prototype app to help new immigrants to Nashville identify good places to live. The prototype is a heat map of bus stops, parks, international grocery stores.</p>
          </div>
          <a href="https://github.com/CoreyAR/community-mapping-hackathon"><img src={require('./images/github-logo.png')} className="App-logo" alt="logo" /></a>
        </div>
        <Home 
          markerData={this.state.markerData}
        />
      </div>
    );
  }
}

export default App;