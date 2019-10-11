import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Navbar } from './containers/navbar/Navbar'
import store from './store'
import { Comp } from '@microfrontends/common'

const history = createBrowserHistory()
const App: React.FC = () => (
  <Router history={history}>
    <Provider store={store}>
      <Navbar></Navbar>
      <Comp></Comp>
    </Provider>
  </Router>
)

export default App;
