import { createSelector } from 'redux-starter-kit'

import { IFeatureState } from './reducer'
import KEYS from '../keys'
import { IRootState } from '../rootReducer'

const userSelector = (state: IRootState) => state[KEYS.feature]

export const getSomeText = createSelector(
  userSelector,
  (state: IFeatureState) => state.someText
)
