import { observable, action, decorate } from 'mobx'

class UserStore {
  constructor() {
    this.user = null
  }

  signIn(user) {
    this.user = user
  }

  singOut() {
    this.user = null
  }
}

export default decorate(UserStore, {
    user: observable,
    signIn: action,
    singOut: action
})