// @flow
import React from 'react'
import {API_KEY} from './../env'
import Map, {GoogleApiWrapper, Marker, HeatmapOverlay, InfoWindow} from '../components/map'
import Sidebar from '../components/sidebar'
import mapStyles from './Styles/RootMapStyle'

import DataManager from '../helpers/data'


const Home = React.createClass({
  getInitialState () {
    return {
      activeMarker: null,
      lat: 36.1639,
      lng: -86.7817,
      points: [],

      // New
      toggledOn: [],
      weights: {},
      markerData: {}
    }
  },

  fetchData(mapProps, map) {
    const dataManager = new DataManager(this.props.google, map)
    const md = dataManager.markerData()
    this.setState({markerData: md})
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
      weights[t] = this.state.markerData[t].weight
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
        markerData={this.state.markerData}
      />
      <Map
        style={style}
        onReady={this.fetchData}
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
              return this.state.markerData[to].list.map((m) => {
              this.state.points.push({key: to, lat: m.mapped_location[1],lng: m.mapped_location[2]})
                return (
                <Marker
                  key={Math.random()}
                  position={{lat: parseFloat(m.mapped_location[1]), lng: parseFloat(m.mapped_location[2])}}
                  icon={this.state.markerData[to].marker}
                />
              )})
            })
          }
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
