import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import RootMap from './Containers/RootMap'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
          <AppBar
            title="TN Counties by Population Age"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        <RootMap />
      </div>
    );
  }
}

export default App;
