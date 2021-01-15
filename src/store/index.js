import { createStore as createReduxStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { rootReducer } from './config'

export const createStore = () => {
  const composeEnhancers = composeWithDevTools({})
  const store = createReduxStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
  return { store }
}

export * from './config'
export * from './hooks'