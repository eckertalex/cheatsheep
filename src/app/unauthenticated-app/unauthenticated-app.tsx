import {Button, Heading, VStack, HStack, Icon, Box} from '@chakra-ui/react'
import {LogIn as LogInIcon, UserPlus as UserPlusIcon} from 'lucide-react'
import {Modal, ModalContents, ModalOpenButton} from 'components/modal/modal'
import {LoginForm} from 'app/unauthenticated-app/components/forms/login-form'
import {RegisterForm} from 'app/unauthenticated-app/components/forms/register-form'

function UnauthenticatedApp() {
  return (
    <VStack alignItems="center" justifyContent="center" width="full" height="100vh">
      <Box role="img" aria-label="Cheatsheep" fontSize="9xl">
        🐑
      </Box>
      <Heading size="2xl" variant="h1">
        Cheatsheep
      </Heading>
      <HStack>
        <Modal>
          <ModalOpenButton>
            <Button colorScheme="blue" leftIcon={<Icon as={LogInIcon} />} w={32}>
              Login
            </Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login" isCentered>
            <LoginForm />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button colorScheme="blue" variant="outline" leftIcon={<Icon as={UserPlusIcon} />} w={32}>
              Register
            </Button>
          </ModalOpenButton>
          <ModalContents aria-label="Register form" title="Register" isCentered>
            <RegisterForm />
          </ModalContents>
        </Modal>
      </HStack>
    </VStack>
  )
}

export default UnauthenticatedApp
