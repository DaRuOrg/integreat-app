import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory'
import store from './store'

import LandingPage from './landing'
import LocationPage from './location'
import Hierarchy from './location/hierarchy'
import ErrorPage from './error'

const container = document.getElementById('container')

/**
 * Holds the current history implementation
 */
export const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        {/* The root page */}
        <Route path="/" exact component={LandingPage}/>
        <Route path="/location/:location/:path*" render={props => {
          let path = props.match.params.path
          return <LocationPage {...props} hierarchy={new Hierarchy(path)}/>
        }}/>
        <Route component={ErrorPage}/>
      </Switch>
    </Router>
  </Provider>,
  container)

// Sets the splash to hidden when the page is rendered
document.getElementById('splash').className += ' splash-hidden'

function handleLanguageChange () {
  let state = store.getState()
  let lang = state.language.language
  if (lang === 'ar' || lang === 'fa') {
    document.body.style.direction = 'rtl'
  } else {
    document.body.style.direction = 'ltr'
  }
}

store.subscribe(handleLanguageChange)

// Enables hot-module-reloading if it's enabled
if (module.hot) {
  module.hot.accept()
}
