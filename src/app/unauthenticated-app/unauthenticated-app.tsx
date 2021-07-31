import {Button, Heading, VStack, HStack, Icon} from '@chakra-ui/react'
import {LogIn as LogInIcon, UserPlus as UserPlusIcon} from 'lucide-react'
import {Modal, ModalContents, ModalOpenButton} from 'components/modal/modal'
import {SignInForm} from 'app/unauthenticated-app/components/forms/sign-in-form'
import {SignUpForm} from 'app/unauthenticated-app/components/forms/sign-up-form'
import {EweIcon} from 'app/ewe'

function UnauthenticatedApp() {
  return (
    <VStack alignItems="center" justifyContent="center" width="full" height="100vh">
      <EweIcon boxSize="8rem" />
      <Heading size="2xl" variant="h1">
        Cheatsheep
      </Heading>
      <HStack>
        <Modal>
          <ModalOpenButton>
            <Button colorScheme="pink" leftIcon={<Icon as={LogInIcon} />} w={32}>
              Sign In
            </Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login" isCentered>
            <SignInForm />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button colorScheme="pink" variant="outline" leftIcon={<Icon as={UserPlusIcon} />} w={32}>
              Register
            </Button>
          </ModalOpenButton>
          <ModalContents aria-label="Register form" title="Register" isCentered>
            <SignUpForm />
          </ModalContents>
        </Modal>
      </HStack>
    </VStack>
  )
}

export default UnauthenticatedApp
