import React from 'react'
import Importer from 'src/lib/Importer'
import accounts from 'src/testdata/accounts'
import lines from 'src/testdata/lines'
import posts from 'src/testdata/posts'
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
