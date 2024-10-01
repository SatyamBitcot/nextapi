"use client"
import { Provider } from 'react-redux'
import store from '../store/store'

function ProviderLayout({children}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default ProviderLayout
