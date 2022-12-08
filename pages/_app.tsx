import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
// import { UserProvider } from '@auth0/nextjs-auth0/client'
import { SessionProvider } from "next-auth/react"

function MyApp({ 
  Component, 
  pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp