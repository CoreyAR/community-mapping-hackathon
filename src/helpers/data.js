// Data sets
import parks from '../data/parks'
import busStop from '../data/bus-stops'
import clinics from '../data/clinics'
import libraries from '../data/libraries'

export const toggleList = { 'busStop': {}, 'parks': {}, 'internationalGroceryStores': {} }
class DataManager {
  constructor() {
    this.dataSets = [parks, busStop, clinics, libraries]
    this.icons = [require('../images/park-marker.png'), require('../images/bus_pointer.png'), require('../images/clinic_icon.png'), require('../images/library-icon.png')]
    this.weights = [4 , 0.1, 6, 5]
    this.keys = ['parks', 'busStop','clinics', 'libraries']
    this.data = {}
  }

  get markerData() {
    const toggleList = this.processDataSets()
    return toggleList
  }

  processDataSets() {
    this.dataSets.map((d, idx) => {
      this.data[this.keys[idx]] = {
        list: d,
        icon: this.icons[idx],
        weight: this.weights[idx]
      }
    })
    return this.data
  }

}

export default DataManager