import {Box, Flex, useColorModeValue as mode, useMediaQuery} from '@chakra-ui/react'
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
      <Flex flexDirection={isLargerThan768 ? 'row' : 'column'} backgroundColor={mode('gray.50', 'gray.800')}>
        {isLargerThan768 ? <Sidebar /> : <MobileNav />}
        <Box
          as="main"
          marginY={4}
          width="full"
          // Full screen height - mobile nav (64px) - top margin (16px) - bottom margin (16px)
          minHeight="calc(100vh - 96px)"
          backgroundAttachment="fixed"
          backgroundImage="url(/assets/svgs/sheep-grazing.svg)"
          backgroundRepeat="no-repeat"
          backgroundPosition="80% 80%"
          backgroundSize="50vw"
        >
          <AppRoutes />
        </Box>
      </Flex>
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
