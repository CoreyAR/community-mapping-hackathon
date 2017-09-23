// @flow
import React, { Component } from 'react';
import '../../App.css';
import Toggle from 'material-ui/Toggle';
import { toggleList } from '../../helpers/data'
console.log(toggleList)
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

  render() {
    console.log(this.props)
    return (
      <div className="sidebar" style={style}>
        {Object.keys(toggleList).map((t) => 
            <Toggle
              label={formatTitle(t)}
              onToggle={this.props.toggleMarkers.bind(this, t)}
              labelStyle={{color: 'white'}}
            />
        )}

        
      </div>
    );
  }
}

export default Sidebar;