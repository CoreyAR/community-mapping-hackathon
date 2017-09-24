// Data sets
import parks from '../data/parks'
import busStop from '../data/bus-stops'
import clinics from '../data/clinics'
import libraries from '../data/libraries'

class DataManager {
  constructor(google, map) {
    this.dataSets = {
      parks:{marker: require('../images/park-marker.png'), weight: 4, list: parks}, 
      busStop:{marker: require('../images/bus_pointer.png'), weight: 0.75, list: busStop},
      clinics:{marker: require('../images/clinic_icon.png'), weight: 6, list: clinics},
      libraries:{marker: require('../images/library-icon.png'), weight: 5, list: libraries}
    }
    this.keys = ['parks', 'busStop','clinics', 'libraries']
    this.data = {'parks': null, 'busStop': null,'clinics': null, 'libraries': null, 'internationalGrocery': null}
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
  }

  processDataSets() {
    /* 
    * This is simply taking the datasets and setting them on this.data. It is implemented 
    * It is implemented like this in case any additional work needs to be done.
    */
    Object.keys(this.dataSets).map((key) => {
      this.data[key] = this.dataSets[key]
    })
    this.processGoogleDataSets()
    return this.data
  }

}

export default DataManager