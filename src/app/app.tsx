import React from 'react'
import {Helmet} from 'react-helmet-async'
import {Flex, Spinner} from '@chakra-ui/react'
import {useAuth} from 'context/auth-provider'

const AuthenicatedApp = React.lazy(() => import(/* webpackPrefetch: true */ 'app/authenticated-app/authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('app/unauthenticated-app/unauthenticated-app'))

function App() {
  const {session} = useAuth()

  return (
    <React.Suspense
      fallback={
        <Flex height="100vh" justifyContent="center" alignItems="center">
          <Spinner label="Loading application..." size="xl" />
        </Flex>
      }
    >
      <Helmet titleTemplate="%s - Cheatsheep" defaultTitle="Cheatsheep">
        <meta
          name="description"
          content="Cheatsheep App written in React with Chakra-UI, react-router, and react-query"
        />
      </Helmet>
      {session ? <AuthenicatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export {App}
