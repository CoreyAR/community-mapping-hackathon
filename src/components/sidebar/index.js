// @flow
import React, { Component } from 'react';
import '../../App.css';
import Toggle from 'material-ui/Toggle';
import { toggleList } from '../../helpers/data'
import styles from './style.css'
const style = {
  position: 'absolute',
  top: '90px',
  right: '0',
  bottom: '0',
  left: '0',
  width: '150px',
  backgroundColor: 'indigo',
}

function formatTitle(title: string) {
  let displayTitle = title.split(/(?=[A-Z])/).join(" ");
  displayTitle = displayTitle[0].toUpperCase() + displayTitle.slice(1, displayTitle.length)
  return displayTitle
}

class Sidebar extends Component {

    componentWillUpdate(nextProps, nextState) {
    // console.log({nextProps, nextState})
    console.log('we changed')
    if (nextProps.loading != this.props.loading) {
      console.log('----',this.props.loading, nextProps.loading)
      this.forceUpdate()
    }
  }

  renderloading() {
    if (this.props.loading) {
      return <div class="sk-circle12 sk-circle"></div>
    }
  }
  render() {
    return (
      <div className="sidebar" style={style}>
        {Object.keys(this.props.markerKeys).map((t, idx) =>{ 
          if (t !== 'loading')
              return <Toggle
              key={t}
              label={formatTitle(t)}
              onToggle={this.props.toggleMarkers.bind(this, t)}
              labelStyle={{color: 'white'}}
              name={t}
            />}
        )}
        {this.renderloading()}
      </div>
    );
  }
}

export default Sidebar;