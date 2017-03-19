import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RootMap from './Containers/RootMap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSjwreFxybyROvLmpKPZWPF83NtqrSowZwgkh7eP4dycFeb9rfO" className="App-logo" alt="logo" />
          <h2>Immigrant Support System</h2>
        </div>
        <RootMap>
        </RootMap>
      </div>
    );
  }
}

export default App;