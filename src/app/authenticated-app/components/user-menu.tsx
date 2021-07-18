import React from 'react'
import {Menu, MenuItem, MenuList, MenuDivider, MenuProps} from '@chakra-ui/react'
import BoringAvatar from 'boring-avatars'
import {Link} from 'react-router-dom'
import {LogOut as LogOutIcon, User as UserIcon} from 'lucide-react'

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
  placement?: MenuProps['placement']
}

function UserMenu({button, signOut, placement = 'right'}: UserMenuProps) {
  return (
    <Menu placement={placement} isLazy>
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

export {UserMenu, UserAvatar}
