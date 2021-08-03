import {Heading, SimpleGrid, Flex, Text, useColorMode} from '@chakra-ui/react'
import {Card} from 'components/card/card'
import {ColorModeSwitcher} from 'components/color-mode-switcher/color-mode-switcher'
import {Page} from 'components/page/page'
import {ChangePassword} from 'features/change-password/change-password'
import {DeleteAccount} from 'features/delete-account/delete-account'

function ProfileScreen() {
  const {colorMode} = useColorMode()

  return (
    <Page display="flex" flexDirection="column" alignItems="start">
      <Heading>Edit Profile</Heading>
      <SimpleGrid columns={{base: 1, md: 2}} spacing={10} w="full">
        <ChangePassword />
        <Card>
          <Heading>Color Preferences</Heading>
          <Flex justifyContent="space-between" marginTop={2.5}>
            <Text>{colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}</Text>
            <ColorModeSwitcher />
          </Flex>
        </Card>
        <DeleteAccount />
      </SimpleGrid>
    </Page>
  )
}

export {ProfileScreen}
