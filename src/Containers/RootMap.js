import React from 'react'
import {API_KEY} from './../env'
import Map, {GoogleApiWrapper, FusionTable} from '../Components/Map'

class _RootMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lat: 36.1639,
      lng: -86.7817
    }
  }

  render () {
    const style = {
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '100%'
    }

    return (

      <Map
        style={style}
        onReady={this.fetchPlaces}
        google={this.props.google}
        zoom={7}
        initialCenter={{lat: this.state.lat, lng: this.state.lng}}
        center={null}
      >
        <FusionTable
          column={this.props.column}
          from={this.props.from}
        />

      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY, libraries: ['places']
})(_RootMap)
