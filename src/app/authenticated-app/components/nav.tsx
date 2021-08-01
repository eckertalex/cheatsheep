import {Button, IconButton, Tooltip} from '@chakra-ui/react'
import {useMatch, NavLink} from 'react-router-dom'
import {LayoutGrid as LayoutGridIcon} from 'lucide-react'

type NavItemProps = {
  label: string
  icon: JSX.Element
  to: string
}

const navItems: NavItemProps[] = [
  {
    label: 'Cheats',
    icon: <LayoutGridIcon />,
    to: '/',
  },
]

function NavItem(props: NavItemProps) {
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
            backgroundColor: 'pink.500',
            color: 'white',
            _hover: {
              backgroundColor: 'pink.500',
            },
            _active: {
              backgroundColor: 'pink.500',
            },
            _focus: {
              backgroundColor: 'pink.500',
            },
          }
        : {})}
    >
      {label}
    </Button>
  )
}

function MiniNavItem(props: NavItemProps) {
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
              backgroundColor: 'pink.500',
              color: 'white',
              _hover: {
                backgroundColor: 'pink.500',
              },
              _active: {
                backgroundColor: 'pink.500',
              },
              _focus: {
                backgroundColor: 'pink.500',
              },
            }
          : {})}
      />
    </Tooltip>
  )
}

export {navItems, NavItem, MiniNavItem}
