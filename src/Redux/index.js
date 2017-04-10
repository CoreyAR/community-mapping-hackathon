import { combineReducers } from 'redux'
import configureStore from './CreateStore'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    fusion: require('./FusionRedux').reducer
  })

  return configureStore(rootReducer)
}
