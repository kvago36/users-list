import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { observer } from 'mobx-react'

import { useStores } from './hooks/use-stores';

import Home from './pages/Home'
import SingIn from './pages/SingIn'
import User from './pages/User'

const PrivateRoute = observer(({ children, ...rest }) => {
  const { userStore } = useStores()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userStore.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
})

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <SingIn />
        </Route>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/users/:id">
          <User />
        </PrivateRoute>
      </Switch>
  </Router>
  );
}

export default App;
