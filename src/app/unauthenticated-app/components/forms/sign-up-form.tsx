import React from 'react'
import {FormControl, FormLabel, Input, Icon, VStack, Stack} from '@chakra-ui/react'
import {useAsync} from 'utils/hooks'
import {useAuth} from 'context/auth-provider'
import {PasswordField} from 'components/password-field/password-field'
import {UserPlus as UserPlusIcon, XOctagon as XOctagonIcon, CheckCircle as CheckCircleIcon} from 'lucide-react'
import {LoadingButton} from 'components/loading-button/loading-button'
import {ModalBody, ModalFooter} from 'components/modal/modal'

function SignUpForm() {
  const {signUp} = useAuth()
  const {status, error, run} = useAsync()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const state =
    status === 'pending' ? 'loading' : status === 'resolved' ? 'success' : status === 'rejected' ? 'error' : 'idle'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    run(
      signUp({
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
            text="Sign Up"
            textLoading="Signing up..."
            textError={error?.message}
            colorScheme="pink"
            colorSchemeError="red"
            colorSchemeSuccess="green"
            ariaText="Sign up to Cheatsheep"
            ariaLoadingAlert="Signing up"
            ariaSuccessAlert="Successfully signed up"
            ariaErrorAlert={`Error signing up: ${error?.message}`}
            icon={<Icon as={UserPlusIcon} />}
            iconError={<Icon as={XOctagonIcon} />}
            iconSuccess={<Icon as={CheckCircleIcon} />}
            type="submit"
          />
        </ModalFooter>
      </Stack>
    </form>
  )
}

export {SignUpForm}
