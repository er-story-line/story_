import { createSelector } from 'reselect'
import { getCurrentLineUri } from './accounts'

const getLineIS = state => state.lines

export const getCurrentLine = createSelector(
  [getCurrentLineUri, getLineIS],
  (uri, lines) => lines.lines[uri] || null,
)

export const getCurrentLineRaw = createSelector(
  [getCurrentLine, getLineIS],
  (currentLine, lines) => {
    const { index } = currentLine
    const { raw } = lines.indices[index]
    return raw || []
  },
)
