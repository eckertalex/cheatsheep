import React from 'react'
import {Menu, MenuItem, MenuList, MenuDivider, MenuProps} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {LogOut as LogOutIcon, User as UserIcon} from 'lucide-react'

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

export {UserMenu}
