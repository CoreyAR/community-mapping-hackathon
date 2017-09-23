// Data sets
import parks from '../data/parks'
import busStop from '../data/bus-stop'
import clinics from '../data/clinics'

export const toggleList = { 'busStop': {}, 'parks': {}, 'internationalGroceryStores': {} }
class DataManager {
  constructor() {
    this.dataSets = [parks, busStop, clinics]
    this.icons = [require('../images/park-marker.png'), require('../images/bus_pointer.png'), require('../images/clinic_icon.png')]
    this.weights = [4 , 0.1, 6]
  }

  get markersList() {
    const toggleList = this.processDataSets()
    return toggleList
  }

  processDataSets() {
    const processed = this.dataSets.map((d, idx) => {
      return {
        list: d,
        marker: this.icons[idx],
        weight: this.weights[idx]
      }
    })
    return processed
  }

}

export default DataManager