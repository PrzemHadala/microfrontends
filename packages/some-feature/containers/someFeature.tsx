import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { IRootState } from '../store/rootReducer'
import { switchText } from '../store/feature/actions'
import { getSomeText } from '../store/feature/selectors'
import { someFeatureContext } from '../store'

import { dashboardContext } from '@microfrontends/dashboard/src/store'
import { getIsSignedIn } from '@microfrontends/dashboard/src/store/user/selectors'
import { IRootState as IDashboardRootState } from '@microfrontends/dashboard/src/store/rootReducer'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    padding: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

interface ISomeFeature {
  isSignedIn?: boolean
  someText?: string
  switchText?: any
}

const SomeFeatureComp: React.FC<ISomeFeature> = ({ isSignedIn, someText, switchText }) => {
  const classes = useStyles({})
  return (
    <Paper className={classes.root}>
      <Typography variant='h6' >This value is external, comes from 'dashboard' microfrontend</Typography>
      <Typography variant='body1'>isLoggedIn: {String(isSignedIn)}</Typography>
      <Divider/>
      <Typography variant='h6'>This value is internal. Switch it <Switch onChange={e => switchText()} /></Typography>
      <Typography variant='body1'>someText: {someText}</Typography>
    </Paper>
  )
}

const mapStateToProps = (state: IRootState) => ({
  someText: getSomeText(state)
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  switchText
}, dispatch)
const internalConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { context: someFeatureContext }
)

const externalMapStateTopProps = (state: IDashboardRootState) => ({
  isSignedIn: getIsSignedIn(state)
})
const externalConnect = connect(
  externalMapStateTopProps,
  null,
  null,
  { context: dashboardContext }
)

export const SomeFeature = compose(
  internalConnect,
  externalConnect
)(SomeFeatureComp)