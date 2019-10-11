import { createSelector } from 'redux-starter-kit'

import { IUserState } from './reducer'
import KEYS from '../keys'
import { IRootState } from '../rootReducer'

const userSelector = (state: IRootState) => state[KEYS.user]

export const getIsSignedIn = createSelector(
  userSelector,
  (state: IUserState) => state.isSignedIn
)

export const getAuthToken = createSelector(
  userSelector,
  (state: IUserState) => state.authToken
)
