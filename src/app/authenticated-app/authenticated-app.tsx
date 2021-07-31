import {Box, Flex, useMediaQuery} from '@chakra-ui/react'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route} from 'react-router-dom'
import {FullPageErrorFallback} from 'components/full-page-error-fallback/full-page-error-fallback'
import {Sidebar} from 'app/authenticated-app/components/sidebar'
import {NotFoundScreen} from 'screens/not-found'
import {ProfileScreen} from 'screens/profile'
import {HomeScreen} from 'screens/home'
import {MobileNav} from 'app/authenticated-app/components/mobile-nav'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

function AuthenticatedApp() {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Flex flexDirection={isLargerThan768 ? 'row' : 'column'}>
        {isLargerThan768 ? <Sidebar /> : <MobileNav />}
        <Box marginY={4} width="full">
          <AppRoutes />
        </Box>
      </Flex>
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
