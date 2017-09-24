// Data sets
import request from 'request'

class DataManager {
  constructor(google, map) {
    this.data = {
      'parks': {marker: require('../images/park-marker.png'), weight: 4, list: null}, 
      'busStop': {marker: require('../images/bus_pointer.png'), weight: 0.75, list: null},
      'clinics': {marker: require('../images/clinic_icon.png'), weight: 6, list: null}, 
      'libraries': {marker: require('../images/library-icon.png'), weight: 5, list: null},
      'internationalGrocery': null, 
      'beerPermits': {marker: require('../images/beer.png'), weight: 2, list: null}
    }
    this.google = google
    this.googleQueries = [{ key: 'internationalGrocery', query: 'world international market grocery store', marker: require('../images/globe.png'), weight: 6 }]
    this.map = map
    this.sodaEndpoints = [
      {key: 'parks', url: 'https://data.nashville.gov/resource/xbru-cfzi.geojson'},
      {key: 'busStop', url: 'https://data.nashville.gov/resource/8v95-enfj.geojson'},
      {key: 'libraries', url: 'https://data.nashville.gov/resource/9fjy-9ky5.geojson'},
      {key: 'beerPermits', url: 'https://data.nashville.gov/resource/p4jz-kk7d.geojson'},
      {key: 'clinics', url: 'https://data.nashville.gov/resource/nh2d-pe3e.geojson'}
    ]
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
            r.geometry.coordinates = [loc.lng(),loc.lat()]
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

  processSodaData () {
    this.sodaEndpoints.map((soda) => {
      this.fetchSodaData(soda.url, soda.key)
    })
  }
  
  fetchSodaData(url, key) {
    request(url, this.addToData.bind(this, key))
  }

  addToData(key, error, response, body) {
    let data = JSON.parse(body).features
    const mapped_data = data.filter((d)=> d.geometry)
    this.data[key].list = mapped_data
  }

  processDataSets() {
    this.processSodaData()
    this.processGoogleDataSets()
    return this.data
  }

}

export default DataManager