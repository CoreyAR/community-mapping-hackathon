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

export class FusionTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      points: []
    }
  }

  componentDidUpdate () {
    this.renderFusionTable()
  }

  componentDidMount () {
    this.fusionTablePromise = wrappedPromise()
    // this.renderFusionTable()
  }

  componentWillUnmount () {
    if (this.fusionTable) {
      this.fusionTable.setMap(null)
    }
  }

  renderFusionTable () {
    let {
      map, google,

    } = this.props
    if (!google) {
      return null
    }

    const pref = {
      map: map
    }
    this.fusionTable = new google.maps.FusionTablesLayer({
          query: {
            select: 'geometry',
            from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ'
          },
          styles: [{
            polygonOptions: {
              fillColor: '#00FF00',
              fillOpacity: 0.3
            }
          }, {
            where: 'birds > 300',
            polygonOptions: {
              fillColor: '#0000FF'
            }
          }, {
            where: 'population > 5',
            polygonOptions: {
              fillOpacity: 1.0
            }
          }]
        });


    this.fusionTable.setMap(pref.map)

    evtNames.forEach(e => {
      this.fusionTable.addListener(e, this.handleEvent(e))
    })

    return this.fusionTable
  }

  getFusionTable () {
    return this.fusionTablePromise
  }

  handleEvent (evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.fusionTable, e)
      }
    }
  }

  render () {
    return null
  }
}

FusionTable.propTypes = {
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
  FusionTable.propTypes[e] = T.func
})

FusionTable.defaultProps = {
  name: 'FusionTable',
  visible: false
}

export default FusionTable
