import { Action, createReducer } from 'redux-starter-kit'

import { ISignUpSuccessAction, userActions } from './actions'

export interface IUserState {
  name: string
  isSignedIn: boolean,
  signUpError: boolean,
  authToken: string
}

const initialState: IUserState = {
  name: '',
  isSignedIn: false,
  signUpError: false,
  authToken: ''
}

const getUserReducer = createReducer(initialState, {
  [userActions.signUpError.type]: state => ({ ...state, signUpError: true }),
  [userActions.signUpSuccess.type]: (state, { authToken }: ISignUpSuccessAction) => ({ ...state, isSignedIn: true, authToken }),
  [userActions.signIn.type]: state => ({ ...state, isSignedIn: true }),
  [userActions.signOut.type]: state => ({ ...state, isSignedIn: false})
})

export const userReducer = (state: IUserState | undefined, action: Action) => getUserReducer(state, action)
