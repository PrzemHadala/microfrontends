import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Switch from '@material-ui/core/Switch'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { IRootState } from '../../store/rootReducer'
import { signIn, signOut } from '../../store/user/actions'
import { getIsSignedIn } from '../../store/user/selectors'
import { dashboardContext } from '../../store'
import { SignInButton } from '../../components/SignInButton'

import { someFeatureContext } from '@microfrontends/some-feature/store'
import { getSomeText } from '@microfrontends/some-feature/store/feature/selectors'
import { IRootState as ISomeFeatureRootState } from '@microfrontends/some-feature/store/rootReducer'
import { switchText } from '@microfrontends/some-feature/store/feature/actions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

interface INavbar {
  isSignedIn?: boolean
  signIn?: any
  signOut?: any
  switchText?: any,
  someText?: string
}
const NavbarComp: React.FC<INavbar> = ({ isSignedIn, signIn, signOut, switchText, someText }) => {
  const classes = useStyles({})
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            external someText: {someText}, switch it: <Switch onChange={ e => switchText()}/>
          </Typography>
          <SignInButton isSignedIn={isSignedIn} signIn={signIn} signOut={signOut} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state: IRootState) => ({
  isSignedIn: getIsSignedIn(state)
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  signIn,
  signOut
}, dispatch)
const internalConnect =  connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { context: dashboardContext }
)

const externalMapStateToProps = (state: ISomeFeatureRootState) => ({
  someText: getSomeText(state)
})
const externalMapDispatchToProps = (dispatch: any) => bindActionCreators({
  switchText
}, dispatch)
const externalConnect =  connect(
  externalMapStateToProps,
  externalMapDispatchToProps,
  null,
  { context: someFeatureContext }
)

export const Navbar = compose(
  internalConnect,
  externalConnect
)(NavbarComp)