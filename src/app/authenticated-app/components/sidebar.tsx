import React from 'react'
import {
  Text,
  Flex,
  Button,
  IconButton,
  Box,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
  MenuDivider,
  useColorModeValue as mode,
  Tooltip,
} from '@chakra-ui/react'
import BoringAvatar from 'boring-avatars'
import {useMatch, Link, NavLink} from 'react-router-dom'
import {useAuth} from 'context/auth-provider'
import {
  LogOut as LogOutIcon,
  User as UserIcon,
  LayoutGrid as LayoutGridIcon,
  ChevronsLeft as ChevronsLeftIcon,
  ChevronsRight as ChevronsRightIcon,
} from 'lucide-react'

const appVersion = process.env.REACT_APP_VERSION

type SidebarItem = {
  label: string
  icon: JSX.Element
  to: string
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Cheats',
    icon: <LayoutGridIcon />,
    to: '/',
  },
]

function NavItem(props: SidebarItem) {
  const {to, label, icon} = props
  const match = useMatch(to)

  return (
    <Button
      as={NavLink}
      to={to}
      isFullWidth
      variant="ghost"
      justifyContent="start"
      fontWeight="medium"
      leftIcon={icon}
      {...(match
        ? {
            backgroundColor: 'blue.500',
            color: 'white',
            _hover: {
              backgroundColor: 'blue.500',
            },
            _active: {
              backgroundColor: 'blue.500',
            },
            _focus: {
              backgroundColor: 'blue.500',
            },
          }
        : {})}
    >
      {label}
    </Button>
  )
}

function MiniNavItem(props: SidebarItem) {
  const {to, label, icon} = props
  const match = useMatch(to)

  return (
    <Tooltip label={label} hasArrow placement="right">
      <IconButton
        as={NavLink}
        to={to}
        variant="ghost"
        aria-label={label}
        icon={icon}
        {...(match
          ? {
              backgroundColor: 'blue.500',
              color: 'white',
              _hover: {
                backgroundColor: 'blue.500',
              },
              _active: {
                backgroundColor: 'blue.500',
              },
              _focus: {
                backgroundColor: 'blue.500',
              },
            }
          : {})}
      />
    </Tooltip>
  )
}

function UserAvatar({name = 'Cheatsheep'}: {name?: string}) {
  return (
    <BoringAvatar
      size={32}
      name={name}
      variant="pixel"
      square={false}
      colors={['#ee5caa', '#f1e37a', '#2bd9fc', '#fc1e60']}
    />
  )
}

type UserMenuProps = {
  button: React.ReactNode
  signOut: () => void
}

function UserMenu({button, signOut}: UserMenuProps) {
  return (
    <Menu placement="right" isLazy>
      {button}
      <MenuList>
        <MenuItem as={Link} to="/profile" icon={<UserIcon />}>
          Profile
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<LogOutIcon />} onClick={signOut}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

function Sidebar() {
  const {session, signOut} = useAuth()
  const [isMiniMode, setMiniMode] = React.useState(false)

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
        {sidebarItems.map((item) => (
          <React.Fragment key={item.to}>
            {isMiniMode ? <MiniNavItem {...item} /> : <NavItem key={item.to} {...item} />}
          </React.Fragment>
        ))}
        <VStack alignItems="start" spacing={4}>
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
                <MenuButton
                  as={Button}
                  variant="ghost"
                  justifyContent="start"
                  fontWeight="semibold"
                  leftIcon={<UserAvatar name={session?.user?.email} />}
                  textAlign="left"
                  isFullWidth
                >
                  {session?.user?.email}
                </MenuButton>
              )
            }
            signOut={signOut}
          />
          <HStack justifyContent="space-between" w="full">
            {isMiniMode ? null : (
              <Text color={mode('gray.300', 'gray.600')} alignSelf="center" fontSize="sm">
                {isMiniMode ? `v${appVersion}` : `App Version v${appVersion}`}
              </Text>
            )}
            <Tooltip label={sidebarToggleLabel} hasArrow placement="right">
              <IconButton
                variant="solid"
                icon={isMiniMode ? <ChevronsRightIcon /> : <ChevronsLeftIcon />}
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
