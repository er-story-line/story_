import store from 'src/store'
import { actionCreators } from 'src/reducers/account'

class AccountRepo {
  constructor() {
    this.accounts = {}

    this.update = this.update.bind(this)
    this.get = this.get.bind(this)
  }

  update(resource, account) {
    this.accounts[resource] = account
    store.dispatch(actionCreators.addAccount({ resource, account }))
    store.dispatch(actionCreators.updateCurAccountIndex({ resource }))
  }

  get(username) {
    return store.getState().account.accounts[username]
    // return new Promise(res => res(this.accounts[username]))
  }
}

export default AccountRepo
