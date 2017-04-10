import { createStore, applyMiddleware, compose } from 'redux'
import {createLogger} from 'redux-logger'
import Config from '../Config/DebugSettings'

// creates the store
export default (rootReducer) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Logger Middleware ------------- */

  if (process.env.NODE_ENV) {
    // the logger master switch
    const USE_LOGGING = Config.reduxLogging
    // silence these saga-based messages
    // create the logger
    const logger = createLogger({
      predicate: (getState, { type }) => USE_LOGGING
    })
    middleware.push(logger)
  }

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  let store

  store = createStore(rootReducer, compose(...enhancers))

  return store
}
