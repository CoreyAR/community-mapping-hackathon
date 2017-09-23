// @flow
import React, { Component } from 'react';
import '../../App.css';
import Toggle from 'material-ui/Toggle';
import { toggleList } from '../../helpers/data'

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
    return (
      <div className="sidebar" style={style}>
        {this.props.markerKeys.map((t, idx) => 
            <Toggle
              label={formatTitle(t)}
              onToggle={this.props.toggleMarkers.bind(this, t)}
              labelStyle={{color: 'white'}}
              name={t}
            />
        )}
      </div>
    );
  }
}

export default Sidebar;