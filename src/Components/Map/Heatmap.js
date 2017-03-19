import React, { PropTypes as T } from 'react'

import { camelize } from './lib/String'
const evtNames = ['click', 'mouseover', 'recenter', 'mouseenter']

const wrappedPromise = function () {
  var wrappedPromise = {}
  var promise = new Promise(function (resolve, reject) {
    wrappedPromise.resolve = resolve
    wrappedPromise.reject = reject
  })
  wrappedPromise.then = promise.then.bind(promise)
  wrappedPromise.catch = promise.catch.bind(promise)
  wrappedPromise.promise = promise

  return wrappedPromise
}

export class HeatmapOverlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      points: []
    }
  }
  componentWillReceiveProps (nextProps) {
    let points = nextProps.points.filter(p => p.lat !== null && p.lng !== null)
      .map((p) => {
      return {location: new nextProps.google.maps.LatLng(p.lat, p.lng), weight: this.props.weights[p.key]}
    })
    this.setState({points})
  }

  componentDidUpdate () {
    this.renderHeatmapOverlay()
  }

  componentDidMount () {
    this.heatmapOverlayPromise = wrappedPromise()
    // this.renderHeatmapOverlay()
  }

  componentWillUnmount () {
    if (this.heatmapOverlay) {
      this.heatmapOverlay.setMap(null)
    }
  }

  renderHeatmapOverlay () {
    let {
      map, google,
    } = this.props
    if (!google) {
      return null
    }

    const gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]

    const pref = {
      map: map,
      data: this.state.points,
      radius: 200,
      opacity: 0.2,
      gradient
    }
    this.heatmapOverlay = new google.maps.visualization.HeatmapLayer(pref)

    this.heatmapOverlay.setMap(pref.map)

    evtNames.forEach(e => {
      this.heatmapOverlay.addListener(e, this.handleEvent(e))
    })

    return this.heatmapOverlay
  }

  getHeatmapOverlay () {
    return this.heatmapOverlayPromise
  }

  handleEvent (evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.heatmapOverlay, e)
      }
    }
  }

  render () {
    return null
  }
}

HeatmapOverlay.propTypes = {
  imageBounds: T.object,
  image: T.string,
  map: T.object,
  polygon: T.object,
  visible: T.bool,
    // callbacks
  onClose: T.func,
  onOpen: T.func
}

evtNames.forEach(e => {
  HeatmapOverlay.propTypes[e] = T.func
})

HeatmapOverlay.defaultProps = {
  name: 'HeatmapOverlay',
  visible: false
}

export default HeatmapOverlay
