import React from 'react'
import { configureStore } from 'redux-starter-kit'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  devTools: {
    name: 'someFeature'
  }
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export const someFeatureContext = React.createContext(null)

export default store