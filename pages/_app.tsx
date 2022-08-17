import '../styles/globals.css'
import { AppPropsWithLayout } from '../types'
import { AlertProvider } from '../context/AlertContext'
import { AuthProvider } from '../context/AuthContext'
import { ShoeProvider } from '../context/ShoeContext'

function MyApp({ Component, pageProps }: AppPropsWithLayout<any>) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <AuthProvider>
      <AlertProvider>
        <ShoeProvider>
          <Component {...pageProps} />
        </ShoeProvider>
      </AlertProvider>
    </AuthProvider>
  )
}

export default MyApp
