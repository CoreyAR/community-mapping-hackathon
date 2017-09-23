import React, {PropTypes as T} from 'react'
import ReactDOM from 'react-dom'
import { camelize } from './lib/String'
import {makeCancelable} from './lib/cancelablePromise'
import invariant from 'invariant'

const mapStyles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: 'calc(100% - 75px)'
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
}

const evtNames = ['ready', 'click', 'dragend', 'recenter']

export {wrapper as GoogleApiWrapper} from './GoogleApiComponent'
export {Marker} from './Marker'
export {InfoWindow} from './InfoWindow'
export {HeatmapOverlay} from './Heatmap'

export class Map extends React.Component {
  constructor (props) {
    super(props)

    invariant(props.hasOwnProperty('google'),
                    'You must include a `google` prop.')

    this.listeners = {}
    this.state = {
      currentLocation: {
        lat: this.props.initialCenter.lat,
        lng: this.props.initialCenter.lng
      }
    }
  }

  componentDidMount () {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        this.geoPromise = makeCancelable(
            new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject)
            })
          )

        this.geoPromise.promise.then(pos => {
          const coords = pos.coords
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          })
        }).catch(e => e)
      }
    }
    this.loadMap()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap()
    }
    if (this.props.visible !== prevProps.visible) {
      this.restyleMap()
    }
    if (this.props.initialCenter.lat !== prevProps.initialCenter.lat && this.props.initialCenter.lng !== prevProps.initialCenter.lng) {
      this.setState({
        currentLocation: this.props.initialCenter
      })
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap()
    }
  }

  componentWillUnmount () {
    const {google} = this.props
    if (this.geoPromise) {
      this.geoPromise.cancel()
    }
    Object.keys(this.listeners).forEach(e => {
      google.maps.event.removeListener(this.listeners[e])
    })
  }

  loadMap () {
    if (this.props && this.props.google) {
      const {google} = this.props
      const maps = google.maps
      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)
      const curr = this.state.currentLocation
      let center = new maps.LatLng(curr.lat, curr.lng)

      let mapConfig = Object.assign({}, {
        center,
        zoom: this.props.zoom,
        styles: this.props.mapStyles,
        mapTypeId: this.props.mapTypeId

      })

      this.map = new maps.Map(node, mapConfig)
      this.map.setTilt(0)
      evtNames.forEach(e => {
        this.listeners[e] = this.map.addListener(e, this.handleEvent(e))
      })
      maps.event.trigger(this.map, 'ready')
      this.forceUpdate()

      this.map.addListener('dragend', (evt) => {
        this.onMove(this.map)
      })
    }
  }

  handleEvent (evtName) {
    let timeout
    const handlerName = `on${camelize(evtName)}`

    return (e) => {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e)
        }
      }, 0)
    }
  }

  onMove (map) {
    this.setState({currentLocation: map.getCenter()})
  }

  recenterMap () {
    const map = this.map

    const {google} = this.props
    const maps = google.maps

    if (!google) return

    if (map) {
      let center = this.state.currentLocation
      if (!(center instanceof google.maps.LatLng)) {
        center = new google.maps.LatLng(center.lat, center.lng)
      }
      map.setCenter(center)
      maps.event.trigger(map, 'recenter')
    }
  }

  restyleMap () {
    if (this.map) {
      const {google} = this.props
      google.maps.event.trigger(this.map, 'resize')
    }
  }

  renderChildren () {
    const {children} = this.props

    if (!children) return

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      })
    })
  }

  render () {
    const style = Object.assign({}, mapStyles.map, this.props.style, {
      display: this.props.visible ? 'inherit' : 'none'
    })

    const containerStyles = Object.assign({},
        mapStyles.container, this.props.containerStyle)

    return (
      <div style={containerStyles} className={this.props.className}>
        <div style={style} ref='map'>
            Loading map...
          </div>
        {this.renderChildren()}
      </div>
    )
  }
};

Map.propTypes = {
  google: T.object,
  zoom: T.number,
  centerAroundCurrentLocation: T.bool,
  center: T.object,
  initialCenter: T.object,
  className: T.string,
  style: T.object,
  containerStyle: T.object,
  visible: T.bool
}

evtNames.forEach(e => {
  Map.propTypes[camelize(e)] = T.func
})

Map.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  center: {},
  centerAroundCurrentLocation: false,
  style: {},
  containerStyle: {},
  visible: true
}

export default Map
