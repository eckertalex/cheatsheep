import React from 'react'
import {
  Box,
  Button,
  Text,
  VStack,
  Flex,
  IconButton,
  MenuButton,
  Tooltip,
  useColorModeValue as mode,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  HStack,
} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {Menu as MenuIcon} from 'lucide-react'
import {UserMenu, UserAvatar} from 'app/authenticated-app/components/user-menu'
import {useAuth} from 'context/auth-provider'
import {navItems, NavItem} from 'app/authenticated-app/components/nav'

const appVersion = process.env.REACT_APP_VERSION

function MobileNav() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {session, signOut} = useAuth()
  const btnRef = React.useRef<HTMLButtonElement>(null)

  return (
    <Flex
      as="nav"
      borderBottomWidth={1}
      borderBottomColor={mode('gray.200', 'gray.700')}
      backgroundColor={mode('white', 'gray.900')}
      alignItems="center"
      justifyContent="space-between"
      padding={4}
      width="full"
      height={16}
    >
      <IconButton ref={btnRef} variant="outline" icon={<MenuIcon />} aria-label="Menu" onClick={onOpen} />
      <UserMenu
        placement="bottom"
        button={
          <Tooltip label={session?.user?.email} hasArrow placement="bottom">
            <MenuButton
              as={Button}
              variant="ghost"
              justifyContent="start"
              rightIcon={<UserAvatar name={session?.user?.email} />}
              textAlign="right"
            >
              <Text isTruncated>eckertalex@pm.me</Text>
            </MenuButton>
          </Tooltip>
        }
        signOut={signOut}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full" finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack as={Link} to="/">
              <Box role="img" aria-label="Cheatsheep" fontSize="2xl">
                🐑
              </Box>
              <Text fontWeight="medium" fontSize="xl">
                Cheatsheep
              </Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody as={VStack} spacing={4}>
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Text color={mode('gray.300', 'gray.600')} fontSize="sm">
              App Version v{appVersion}
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export {MobileNav}
