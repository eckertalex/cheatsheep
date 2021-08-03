import {VStack, Text} from '@chakra-ui/react'
import BoringAvatar from 'boring-avatars'
import {Card} from 'components/card/card'
import {useAuth} from 'context/auth-provider'

function UserAvatar({name = 'Cheatsheep', size = 32}: {name?: string; size?: string | number}) {
  return (
    <BoringAvatar
      size={size}
      name={name}
      variant="pixel"
      square={false}
      colors={['#ee5caa', '#f1e37a', '#2bd9fc', '#fc1e60']}
    />
  )
}

function UserInfo() {
  const {session} = useAuth()
  return (
    <Card>
      <VStack spacing={2.5}>
        <UserAvatar name={session?.user?.email} size={64} />
        <Text fontSize="xl" fontWeight="semibold" isTruncated>
          {session?.user?.email}
        </Text>
      </VStack>
    </Card>
  )
}

export {UserInfo, UserAvatar}
