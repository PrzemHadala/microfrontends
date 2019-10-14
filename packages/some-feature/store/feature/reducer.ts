import { Action, createReducer } from 'redux-starter-kit'

import { featureActions } from './actions'

export interface IFeatureState {
  someText: string
}

const initialState: IFeatureState = {
  someText: 'firstText',
}

const getFeatureReducer = createReducer(initialState, {
  [featureActions.switchText.type]: state => ({ ...state, someText: state.someText === 'firstText' ? 'secondText' : 'firstText' }),
})

export const featureReducer = (state: IFeatureState | undefined, action: Action) => getFeatureReducer(state, action)
