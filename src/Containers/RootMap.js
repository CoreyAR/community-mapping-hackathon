import React from 'react'
import {API_KEY} from './../env'
import Map, {GoogleApiWrapper, Marker, InfoWindow} from '../Components/Map'
import mapStyles from './Styles/RootMapStyle'
import parksData from '../Data/parks'

var _RootMap = React.createClass({

  componentWillReceiveProps (nextProps) {
  },

  displayMarkers: function (m) {

  },

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
        google={this.props.google}
        zoom={16}
        initialCenter={{lat: 36.1639,lng: -86.7817}}
        center={null}
        mapStyles={mapStyles}
        mapTypeId={'satellite'}
      >
        {
          parksData.map((p, i) => {
            console.log(p.mapped_location[2])
            return (
             <Marker
              key={Math.random()}
              position={{lat: parseFloat(p.mapped_location[1]), lng: parseFloat(p.mapped_location[2])}}
             />
            )
          })
        }
      </Map>

    )
  }
})

export default GoogleApiWrapper({
  apiKey: API_KEY
})(_RootMap)
