import React from 'react'
import {API_KEY} from './../env'

import Map, {GoogleApiWrapper, Marker, InfoWindow, HeatmapOverlay, FusionTable} from '../Components/Map'
import Map, {GoogleApiWrapper, Marker, HeatmapOverlay, FusionTable} from '../Components/Map'
import mapStyles from './Styles/RootMapStyle'
// Data sets
import parksData from '../Data/parks'
import bustStopData from '../Data/bus-stop'
// Marker Logos
import parksMarker from '../Images/park-marker.png'
import globeMarker from '../Images/globe.png'
import busMarker from '../Images/bus_pointer.png'


var _RootMap = React.createClass({
  getInitialState () {
    return {
      activeMarker: null,
      lat: 36.1639,
      lng: -86.7817,
      internationalGrocery: []
    }
  },

  componentWillReceiveProps (nextProps) {
  },

  componentDidUpdate(prevProps, prevState) {
    
  },

  fetchPlaces: function(mapProps, map) {
    const {google} = this.props;
    let location = new google.maps.LatLng(this.state.lat, this.state.lng);
    const request = {query: 'world international market grocery store', location}
    const service = new google.maps.places.PlacesService(map)
    service.textSearch(request, (results, status) => { 
      if  (status === this.props.google.maps.places.PlacesServiceStatus.OK) {
        console.log(results)
        this.setState({internationalGrocery: results})
      }
    })
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
        zoom={10}
        initialCenter={{lat: this.state.lat,lng: this.state.lng}}
        center={null}
        mapStyles={mapStyles}
      >
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          style={{zIndex: 5000}}
        >
          <div>
          </div>
          </InfoWindow>
          <FusionTable
          />
        <HeatmapOverlay
        />
        <FusionTable />
      </Map>
    )
  }
})

export default GoogleApiWrapper({
  apiKey: API_KEY, libraries: ['places']
})(_RootMap)
