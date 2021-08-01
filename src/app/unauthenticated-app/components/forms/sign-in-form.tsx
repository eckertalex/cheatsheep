import React from 'react'
import {FormControl, FormLabel, Input, Icon, VStack, Stack} from '@chakra-ui/react'
import {useAsync} from 'utils/hooks'
import {useAuth} from 'context/auth-provider'
import {PasswordField} from 'components/password-field/password-field'
import {LogIn as LogInIcon, XOctagon as XOctagonIcon, CheckCircle as CheckCircleIcon} from 'lucide-react'
import {LoadingButton} from 'components/loading-button/loading-button'
import {ModalBody, ModalFooter} from 'components/modal/modal'

function SignInForm() {
  const {signIn} = useAuth()
  const {status, error, run} = useAsync()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const state =
    status === 'pending' ? 'loading' : status === 'resolved' ? 'success' : status === 'rejected' ? 'error' : 'idle'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    run(
      signIn({
        email,
        password,
      })
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="6">
        <ModalBody>
          <VStack spacing="2.5">
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
            </FormControl>
            <PasswordField
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <LoadingButton
            state={state}
            text="Sign In"
            textLoading="Signing in..."
            textError={error?.message}
            colorScheme="pink"
            colorSchemeError="red"
            colorSchemeSuccess="green"
            ariaText="Sign in to Cheatsheep"
            ariaLoadingAlert="Signing in"
            ariaSuccessAlert="Successfully signed in"
            ariaErrorAlert={`Error signing in: ${error?.message}`}
            icon={<Icon as={LogInIcon} />}
            iconError={<Icon as={XOctagonIcon} />}
            iconSuccess={<Icon as={CheckCircleIcon} />}
            type="submit"
          />
        </ModalFooter>
      </Stack>
    </form>
  )
}

export {SignInForm}
