import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  slideYear: ['year'],
  slideAge: ['age']
})

export const FusionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  year: 2010,
  age: 5,
  column: 'twozeroonezero',
  fusionType: 'countyByAge'
})

/* ------------- Reducers ------------- */

export const slideYear = (state, { year }) => {
  return state.merge({year})
}

export const slideAge = (state, {age}) => {
  return state.merge({age})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SLIDE_YEAR]: slideYear,
  [Types.SLIDE_AGE]: slideAge
})

/* ------------- Selectors ------------- */
