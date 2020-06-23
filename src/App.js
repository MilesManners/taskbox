import React from 'react'
import { Provider } from 'react-redux'

import store from './lib/redux'
import InboxScreen from './components/InboxScreen'

export default function App () {
  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  )
}
