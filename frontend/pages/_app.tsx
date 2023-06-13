import React from 'react'
import "../styles/globals.css"
import { AppProps } from 'next/app'

import Layout from '@/components/Layout/Layout'


function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
