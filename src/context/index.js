import React from 'react'

import UserStore from '../store/user-store'

export const storesContext = React.createContext({
  userStore: new UserStore(),
})