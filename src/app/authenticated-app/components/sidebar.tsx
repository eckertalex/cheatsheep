import {
  Text,
  Flex,
  Button,
  Box,
  VStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Avatar,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {useMatch, Link, NavLink} from 'react-router-dom'
import {LogOut as LogOutIcon, User as UserIcon, LayoutGrid as LayoutGridIcon} from 'lucide-react'
import {useAuth} from 'context/auth-provider'

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

function UserMenu() {
  const {session, signOut} = useAuth()

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        justifyContent="start"
        fontWeight="semibold"
        leftIcon={<Avatar size="sm" name={session?.user?.email} />}
        textAlign="left"
        isFullWidth
      >
        {session?.user?.email}
      </MenuButton>
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

function SidebarFooter() {
  return (
    <VStack alignItems="start" spacing={4} marginX={4}>
      <UserMenu />
      <Text color={mode('gray.300', 'gray.600')} alignSelf="center" fontSize="sm">
        App Version v{process.env.REACT_APP_VERSION}
      </Text>
    </VStack>
  )
}

function Sidebar() {
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
      paddingY={4}
      width={64}
    >
      <Link to="/">
        <VStack justifyContent="center" alignItems="center">
          <Box role="img" aria-label="Cheatsheep" fontSize="6xl">
            🐑
          </Box>
          <Text fontWeight="medium" fontSize="xl">
            Cheatsheep
          </Text>
        </VStack>
      </Link>
      <Flex flexDirection="column" justifyContent="space-between" height="full">
        <VStack marginX={4} marginTop={4} spacing={4}>
          {sidebarItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </VStack>
        <SidebarFooter />
      </Flex>
    </Flex>
  )
}

export {Sidebar}
