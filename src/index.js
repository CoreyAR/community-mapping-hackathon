import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './Redux'
import App from './Containers/App'
import './index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const store = createStore()

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
