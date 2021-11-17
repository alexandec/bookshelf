/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  const [user, setUser] = React.useState(null)

  const login = form => auth.login(form).then(u => setUser(u))
  const register = form => auth.register(form).then(u => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }

  // 🐨 if there's a user, then render the AuthenticatedApp with the user and logout
  // 🐨 if there's not a user, then render the UnauthenticatedApp with login and register

  if (user) {
    return <AuthenticatedApp user={user} logout={logout} />
  } else {
    return <UnauthenticatedApp login={login} register={register} />
  }
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
