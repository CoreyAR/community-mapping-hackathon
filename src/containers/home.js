// @flow
import React from 'react'
import {API_KEY} from './../env'
import Map, {GoogleApiWrapper, Marker, HeatmapOverlay, InfoWindow} from '../components/map'
import Sidebar from '../components/sidebar'
import mapStyles from './Styles/RootMapStyle'
// Data sets
import parksData from '../data/parks'
import bustStopData from '../data/bus-stop'
import clinicData from '../data/clinics'

// Marker Logos
import parksMarker from '../images/park-marker.png'
import globeMarker from '../images/globe.png'
import busMarker from '../images/bus_pointer.png'
import clinicMarker from '../images/clinic-marker.png'

const Home = React.createClass({
  getInitialState () {
    return {
      activeMarker: null,
      lat: 36.1639,
      lng: -86.7817,
      internationalGrocery: [],
      points: [],

      // New
      toggledOn: [],
      weights: {}
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

  toggleMarkers(t, e, on) {
    const idx = this.state.toggledOn.indexOf(t)
    if (on && idx < 0) {
      this.state.toggledOn.push(t)
      const weights = this.calculateWeights()
      this.setState({toggledOn: this.state.toggledOn, points: [], weights})
      
    } else if (!on && idx > -1) {
      this.state.toggledOn.splice(idx,1)
      const weights = this.calculateWeights()
      this.setState({toggledOn: this.state.toggledOn, points: [], weights})
      
    }
  },

  calculateWeights () {
    let weights = {}
    this.state.toggledOn.map((t) => {
      weights[t] = this.props.markerData[t].weight
      
    })
    return weights
  },

  render () {
    const style = {
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '150px',
      width: '100%',
      height: '100%'
    }

    return (
      <div>
      <Sidebar
        toggleMarkers={this.toggleMarkers}
        markerKeys={Object.keys(this.props.markerData)}
      />
      <Map
        style={style}
        onReady={this.fetchPlaces}
        google={this.props.google}
        zoom={14}
        initialCenter={{lat: 36.1639,lng: -86.7817}}
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

          {
            this.state.toggledOn.map((to) => {
              return this.props.markerData[to].list.map((m) => {
              this.state.points.push({key: to, lat: m.mapped_location[1],lng: m.mapped_location[2]})
                return (
                <Marker
                  key={Math.random()}
                  position={{lat: parseFloat(m.mapped_location[1]), lng: parseFloat(m.mapped_location[2])}}
                  icon={parksMarker}
                />
              )})
            })
          }
        {/* {
          this.state.internationalGrocery.map((groc, i) => {
            this.state.points.push({key:'grocery', lat: groc.geometry.location.lat(), lng: groc.geometry.location.lng()})
            return (
              <Marker
                key={Math.random()}
                position={{lat: groc.geometry.location.lat(), lng: groc.geometry.location.lng()}}
                icon={globeMarker}
             />
            )
          })
        } */}
        <HeatmapOverlay
          points={this.state.points}
          weights={this.state.weights}
        />
      </Map>
      </div>
    )
  }
})

export default GoogleApiWrapper({ apiKey: API_KEY })(Home)
