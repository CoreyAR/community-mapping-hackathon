// Data sets
import parks from '../data/parks'
import busStop from '../data/bus-stop'
import clinics from '../data/clinics'
import libraries from '../data/libraries'

export const toggleList = { 'busStop': {}, 'parks': {}, 'internationalGroceryStores': {} }
class DataManager {
  constructor(google, map) {
    this.dataSets = [parks, busStop, clinics, libraries]
    this.icons = [require('../images/park-marker.png'), require('../images/bus_pointer.png'), require('../images/clinic_icon.png'), require('../images/library-icon.png')]
    this.weights = [4 , 0.1, 6, 5]
    this.keys = ['parks', 'busStop','clinics', 'libraries']
    this.data = {loading: true}
    this.google = google
    this.googleQueries = [{ key: 'internationalGrocery', query: 'world international market grocery store', marker: '../images/globe.png', weight: 6 }]
    this.map = map
  }

  markerData() {
    const toggleList = this.processDataSets()
    return toggleList
  }

  processGoogleDataSets(){
    const {google} = this;
    let location = new google.maps.LatLng(36.1639, -86.7817);
    this.googleQueries.map((g, idx) => {
      const request = {query: g.query, location}
      const service = new google.maps.places.PlacesService(this.map)
      service.textSearch(request, (results, status) => { 
        if  (status === google.maps.places.PlacesServiceStatus.OK) {
          const processed_results = results.map((r)=> {
            let loc = r.geometry.location
            r.mapped_location = [null, loc.lat(), loc.lng()]
            return r
          })
          this.data[g.key] = {
            list: processed_results,
            marker: g.marker,
            weight: g.weight
          }
        }
      })
    })
    this.data.loading = false
  }

  processDataSets() {
    this.dataSets.map((d, idx) => {
      this.data[this.keys[idx]] = {
        list: d,
        marker: this.icons[idx],
        weight: this.weights[idx]
      }
    })
    this.processGoogleDataSets()
    return this.data
  }

}

export default DataManager