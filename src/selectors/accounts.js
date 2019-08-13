import { createSelector } from 'reselect'

const getCurrentAccountIS = state => state.accounts

export const getCurrentAccount = createSelector(
  [getCurrentAccountIS],
  accounts => accounts.accounts[accounts.curAccountIndex] || null,
)

export const getCurrentLineUri = createSelector(
  [getCurrentAccount],
  curAccount => (curAccount ? curAccount.lines.current.uri : null),
)
