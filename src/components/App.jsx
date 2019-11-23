import React from 'react'
import Importer from '../lib/Importer'
import accounts from '../testdata/accounts'
import lines from '../testdata/lines'
import posts from '../testdata/posts'
import Router from './Router'

// Import test data
if (process.env.NODE_ENV === 'development') {
  const importer = new Importer()
  importer.importSingle({
    accounts,
    posts,
    lines,
  })
}

export default () => <Router />
