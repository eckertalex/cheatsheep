import {useForm} from 'react-hook-form'
import {FormControl, FormLabel, Input, Icon, VStack, Stack, FormErrorMessage} from '@chakra-ui/react'
import {useAsync} from 'utils/hooks'
import {useAuth} from 'context/auth-provider'
import {PasswordField} from 'components/password-field/password-field'
import {LogIn as LogInIcon, XOctagon as XOctagonIcon, CheckCircle as CheckCircleIcon} from 'lucide-react'
import {LoadingButton} from 'components/loading-button/loading-button'
import {ModalBody, ModalFooter} from 'components/modal/modal'

type Form = {email: string; password: string}

function SignInForm() {
  const {signIn} = useAuth()
  const {
    register,
    handleSubmit,
    formState: {errors, touchedFields},
  } = useForm<Form>({mode: 'onTouched'})
  const {status, error, run} = useAsync()
  const state =
    status === 'pending' ? 'loading' : status === 'resolved' ? 'success' : status === 'rejected' ? 'error' : 'idle'

  return (
    <form onSubmit={handleSubmit((data) => run(signIn(data)))}>
      <Stack spacing="6">
        <ModalBody>
          <VStack spacing="2.5">
            <FormControl id="email" isInvalid={errors.email && touchedFields.email} isRequired>
              <FormLabel>Email</FormLabel>
              <Input {...register('email', {required: true})} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <PasswordField
              {...register('password', {
                required: true,
                minLength: {value: 6, message: 'Password should be at least 6 characters'},
              })}
              isInvalid={errors.password && touchedFields.password}
              error={errors.password?.message}
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
