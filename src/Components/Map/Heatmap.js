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

  componentDidMount () {
    this.heatmapOverlayPromise = wrappedPromise()
    this.renderHeatmapOverlay()
  }

  componentWillUnmount () {
    if (this.heatmapOverlay) {
      this.heatmapOverlay.setMap(null)
    }
  }

  getPoints () {
    return []
  }

  renderHeatmapOverlay () {
    let {
      map, google, imageBounds, image
    } = this.props
    if (!google) {
      return null
    }

  // let pos = position || mapCenter;
    // if (!(pos instanceof google.maps.LatLng)) {
    //   position = new google.maps.LatLng(pos.lat, pos.lng);
    // }

    const pref = {
      map: map,
      imageBounds: imageBounds,
      image: image
    }
    this.heatmapOverlay = new google.maps.visualization.HeatmapLayer({
      data: this.getPoints(),
      map: map
    })
    // new google.maps.HeatmapOverlay(pref.image, pref.imageBounds)
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
