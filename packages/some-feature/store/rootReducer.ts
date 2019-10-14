import { combineReducers } from 'redux-starter-kit'
import { featureReducer, IFeatureState } from './feature/reducer'
import  KEYS  from './keys'

export interface IRootState {
  [KEYS.feature]: IFeatureState
}

const rootReducer = combineReducers<IRootState>({
  [KEYS.feature]: featureReducer
})

export default rootReducer