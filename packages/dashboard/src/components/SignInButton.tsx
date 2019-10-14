import React from 'react'
import Button from '@material-ui/core/Button'

interface SignInButton {
  isSignedIn: boolean
  userName?: string
  signIn: any,
  signOut: any
}

export const SignInButton: React.FC<SignInButton> = ({ isSignedIn, userName, signIn, signOut }) => (
  <>
    {isSignedIn
      ? <Button color='secondary' onClick={e => signOut()}>Sign Out</Button>
      : <Button color='inherit' onClick={e => signIn()}>Sign In</Button>
    }
  </>
)