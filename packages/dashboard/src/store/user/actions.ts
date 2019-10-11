import { createAction } from 'redux-starter-kit'

export interface ISignUpAction  {
  password: string,
  email: string,
  name: string
} 

export interface ISignUpSuccessAction {
  authToken: string
}

export const signUp = createAction<ISignUpAction>('[user] signUp')
export const signUpSuccess = createAction<ISignUpSuccessAction>('[user] signUpSuccess')
export const signUpError = createAction('[user] signUpErorr')

export const userActions = {
  signUp,
  signUpSuccess,
  signUpError
}