import { combineReducers } from 'redux-starter-kit'
import { userReducer, IUserState } from './user/reducer'
import  KEYS  from './keys'

export interface IRootState {
  [KEYS.user]: IUserState
}

const rootReducer = combineReducers<IRootState>({
  [KEYS.user]: userReducer
})

export default rootReducer