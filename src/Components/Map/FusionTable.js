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
  constructor (props) {
    super(props)
    this.state = {
      points: []
    }
  }

  componentDidUpdate () {
    if (this.fusionTable) {
      this.fusionTable.setMap(null)
    }
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
      map, google, column, from

    } = this.props
    console.log('from', from)
    console.log(from)
    if (!google || !column) {
      return null
    }

    const pref = {
      map: map
    }

    this.fusionTable = new google.maps.FusionTablesLayer({
      query: {
        select: 'geometry',
        from: from
      },
      styles: [{
        polygonOptions: {
          fillColor: '#1E88E5',
          fillOpacity: 0.1
        }
      },
      {
        where: `${column} > 250`,
        polygonOptions: {
          fillOpacity: 0.2
        }
      },
      {
        where: `${column} > 500`,
        polygonOptions: {
          fillOpacity: 0.3
        }
      },
      {
        where: `${column} > 1000`,
        polygonOptions: {
          fillOpacity: 0.4
        }
      },
      {
        where: `${column} > 1500`,
        polygonOptions: {
          fillOpacity: 0.5
        }
      },
      {
        where: `${column} > 2000`,
        polygonOptions: {
          fillOpacity: 0.6
        }
      },
      {
        where: `${column} > 2500`,
        polygonOptions: {
          fillOpacity: 0.7
        }
      },
      {
        where: `${column} > 3000`,
        polygonOptions: {
          fillOpacity: 0.8
        }
      },
      {
        where: `${column} > 5000`,
        polygonOptions: {
          fillOpacity: 0.9
        }
      },
      {
        where: `${column} > 7000`,
        polygonOptions: {
          fillOpacity: 1.0
        }
      }
      ]
    })

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
