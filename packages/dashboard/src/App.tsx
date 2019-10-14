import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Navbar } from './containers/navbar/Navbar'
import store, { dashboardContext } from './store'
import { SomeFeatureSubapp } from '@microfrontends/some-feature'
import featureStore, { someFeatureContext } from '@microfrontends/some-feature/store'

const history = createBrowserHistory()
const App: React.FC = () => (
  <Router history={history}>
    <Provider store={store} context={dashboardContext}>
      <Provider store={featureStore} context={someFeatureContext}>
        <Navbar></Navbar>
        <SomeFeatureSubapp />
      </Provider>
    </Provider>
  </Router>
)

export default App;
