import React from 'react'
import {API_KEY} from './../env'
import Map, {GoogleApiWrapper, Marker, InfoWindow} from '../Components/Map'
import mapStyles from './Styles/RootMapStyle'
import parksData from '../Data/parks'

var _RootMap = React.createClass({
  getInitialState () {
    return {
      activeMarker: null
    }
  },

  componentWillReceiveProps (nextProps) {
  },

  componentDidUpdate(prevProps, prevState) {
    
  },

  fetchPlaces: function(mapProps, map) {
    const {google} = this.props;
    const request = {query: 'international grocery store'}
    const service = new google.maps.places.PlacesService(map)
    service.textSearch(request, this.callback);
  },

  callback(results, status) {
  if (status === this.props.google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(results[i]);
      }
    }
  },

  onMarkerClick: function (props, marker, e) {
    this.setState({
    })
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
        onReady={this.fetchPlaces}
        google={this.props.google}
        zoom={16}
        initialCenter={{lat: 36.1639,lng: -86.7817}}
        center={null}
        mapStyles={mapStyles}
        mapTypeId={'satellite'}
      >
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          style={{zIndex: 5000}}
        >
          <div>
          </div>
          </InfoWindow>
        {
          parksData.map((p, i) => {
            return (
             <Marker
              key={Math.random()}
              position={{lat: parseFloat(p.mapped_location[1]), lng: parseFloat(p.mapped_location[2])}}
              onClick={this.onMarkerClick}
             />
            )
          })
        }
      </Map>

    )
  }
})

export default GoogleApiWrapper({
  apiKey: API_KEY, libraries: ['places']
})(_RootMap)
