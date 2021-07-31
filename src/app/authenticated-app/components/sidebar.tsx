import React from 'react'
import {
  Text,
  Flex,
  Button,
  IconButton,
  Box,
  VStack,
  HStack,
  MenuButton,
  Divider,
  useColorModeValue as mode,
  Tooltip,
} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {useAuth} from 'context/auth-provider'
import {useLocalStorageValue} from '@react-hookz/web'
import {SidebarClose as SidebarCloseIcon, SidebarOpen as SidebarOpenIcon} from 'lucide-react'
import {UserMenu, UserAvatar} from 'app/authenticated-app/components/user-menu'
import {navItems, NavItem, MiniNavItem} from 'app/authenticated-app/components/nav'

const appVersion = process.env.REACT_APP_VERSION

function Sidebar() {
  const {session, signOut} = useAuth()
  const [isMiniMode, setMiniMode] = useLocalStorageValue('__cheatsheep_sidebar_mini_mode__', false)

  const sidebarToggleLabel = isMiniMode ? 'Expand' : 'Collapse'

  return (
    <Flex
      as="nav"
      flexDirection="column"
      overflowY="auto"
      borderRightWidth={1}
      borderRightColor={mode('gray.200', 'gray.700')}
      backgroundColor={mode('white', 'gray.900')}
      flexShrink={0}
      height="100vh"
      padding={4}
      width={isMiniMode ? 16 : 64}
    >
      <HStack justifyContent={isMiniMode ? 'center' : 'start'} as={Link} to="/">
        <Box role="img" aria-label="Cheatsheep" fontSize="2xl" marginLeft={isMiniMode ? undefined : 4}>
          🐑
        </Box>
        {isMiniMode ? null : (
          <Text fontWeight="medium" fontSize="xl">
            Cheatsheep
          </Text>
        )}
      </HStack>
      <Divider marginY={4} />
      <Flex flexDirection="column" justifyContent="space-between" alignItems="center" height="full">
        <VStack spacing={4} width="full">
          {navItems.map((item) => (
            <React.Fragment key={item.to}>
              {isMiniMode ? <MiniNavItem {...item} /> : <NavItem {...item} />}
            </React.Fragment>
          ))}
        </VStack>
        <VStack alignItems={isMiniMode ? 'center' : 'start'} spacing={4} w="full">
          <Divider />
          <UserMenu
            button={
              isMiniMode ? (
                <Tooltip label="User menu" hasArrow placement="right">
                  <MenuButton
                    as={IconButton}
                    variant="ghost"
                    aria-label={session?.user?.email}
                    icon={<UserAvatar name={session?.user?.email} />}
                  />
                </Tooltip>
              ) : (
                <Tooltip label={session?.user?.email} hasArrow placement="right">
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    justifyContent="start"
                    leftIcon={<UserAvatar name={session?.user?.email} />}
                    textAlign="left"
                    isFullWidth
                  >
                    <Text isTruncated>{session?.user?.email}</Text>
                  </MenuButton>
                </Tooltip>
              )
            }
            signOut={signOut}
          />
          <HStack justifyContent={isMiniMode ? 'center' : 'space-between'} w="full">
            {isMiniMode ? null : (
              <Text color={mode('gray.300', 'gray.600')} fontSize="sm">
                {isMiniMode ? `v${appVersion}` : `App Version v${appVersion}`}
              </Text>
            )}
            <Tooltip label={sidebarToggleLabel} hasArrow placement="right">
              <IconButton
                variant="solid"
                icon={isMiniMode ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
                aria-label={`${sidebarToggleLabel} sidebar`}
                onClick={() => setMiniMode((s) => !s)}
              />
            </Tooltip>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  )
}

export {Sidebar}
