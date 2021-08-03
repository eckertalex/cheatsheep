import React from 'react'
import {
  Button,
  Text,
  VStack,
  Flex,
  IconButton,
  MenuButton,
  Tooltip,
  useColorModeValue,
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
import {EweIcon} from 'app/ewe'

const appVersion = process.env.REACT_APP_VERSION

function MobileNav() {
  const borderBottomColor = useColorModeValue('gray.200', 'gray.700')
  const backgroundColor = useColorModeValue('white', 'gray.900')
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {session, signOut} = useAuth()
  const btnRef = React.useRef<HTMLButtonElement>(null)

  return (
    <Flex
      as="nav"
      borderBottomWidth={1}
      borderBottomColor={borderBottomColor}
      backgroundColor={backgroundColor}
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
              <Text isTruncated>{session?.user?.email}</Text>
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
              <EweIcon aria-label="Cheatsheep" boxSize="1.5rem" />
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
            <Text color={borderBottomColor} fontSize="sm">
              App Version v{appVersion}
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export {MobileNav}
