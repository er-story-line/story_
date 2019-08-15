import store from 'src/store'
import { actionCreators } from 'src/reducers/accounts'

class AccountRepo {
  update(resource, account) {
    store.dispatch(actionCreators.addAccount({ resource, account }))
    store.dispatch(actionCreators.updateCurAccountIndex({ resource }))
  }

  get(username) {
    return store.getState().accounts.accounts[username]
  }
}

export default AccountRepo
