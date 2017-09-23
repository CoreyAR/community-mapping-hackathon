import React from 'react'
import {API_KEY} from './../env'
import Map, {GoogleApiWrapper, Marker, HeatmapOverlay} from '../Components/Map'
import mapStyles from './Styles/RootMapStyle'
// Data sets
import parksData from '../Data/parks'
import bustStopData from '../Data/bus-stop'
import clinicData from '../Data/clinics'
// Marker Logos
import parksMarker from '../Images/park-marker.png'
import globeMarker from '../Images/globe.png'
import busMarker from '../Images/bus_pointer.png'
import clinicMarker from '../Images/clinic-marker.png'

var _RootMap = React.createClass({
  getInitialState () {
    return {
      activeMarker: null,
      lat: 36.1639,
      lng: -86.7817,
      internationalGrocery: [],
      points: []
    }
  },

  fetchPlaces: function(mapProps, map) {
    const {google} = this.props;
    let location = new google.maps.LatLng(this.state.lat, this.state.lng);
    const request = {query: 'world international market grocery store', location}
    const service = new google.maps.places.PlacesService(map)
    service.textSearch(request, (results, status) => { 
      if  (status === this.props.google.maps.places.PlacesServiceStatus.OK) {
        this.setState({internationalGrocery: results})
      }
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
        zoom={14}
        initialCenter={{lat: 36.1639,lng: -86.7817}}
        center={null}
        mapStyles={mapStyles}
      >
        {
          parksData.map((p, i) => {
            this.state.points.push({key: 'park', lat: p.mapped_location[1],lng: p.mapped_location[2]})
            return (
             <Marker
              key={Math.random()}
              position={{lat: parseFloat(p.mapped_location[1]), lng: parseFloat(p.mapped_location[2])}}
              onClick={this.onMarkerClick}
              icon={parksMarker}
             />
            )
          })
        }
        {
          this.state.internationalGrocery.map((groc, i) => {
            this.state.points.push({key:'grocery', lat: groc.geometry.location.lat(), lng: groc.geometry.location.lng()})
            return (
              <Marker
                key={Math.random()}
                position={{lat: groc.geometry.location.lat(), lng: groc.geometry.location.lng()}}
                onClick={this.onMarkerClick}
                icon={globeMarker}
             />
            )
          })
        }
        {
          bustStopData.map((b, i) => {
            this.state.points.push({key: 'bustop', lat: b.mapped_location.latitude, lng: b.mapped_location.longitude})
            return (
              <Marker
                key={Math.random()}
                position={{lat: b.mapped_location.latitude , lng: b.mapped_location.longitude}}
                onClick={this.onMarkerClick}
                icon={busMarker}
              />
            )            
          })
        }
        {
          clinicData.data.map((c,i) => {
            this.state.points.push({key: 'clinic', lat: c[11][1], lng: c[11][2] })
            return(
              <Marker
                key={Math.random()}
                position={{lat: parseInt(c[11][1]), lng: parseInt(c[11[2]])}}
                onClick={this.onMarkerClick}
                icon={clinicMarker}
              />
            )
          })
        }
        <HeatmapOverlay
          points={this.state.points}
          weights={{bustop: 0.1 , park: 4, grocery: 15, clinic: 10}}
        />
      </Map>
    
    )
  }
})

export default GoogleApiWrapper({ apiKey: API_KEY })(_RootMap)
