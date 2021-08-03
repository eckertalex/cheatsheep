import React from 'react'
import {Heading, Icon, VStack} from '@chakra-ui/react'
import {useAsync} from 'utils/hooks'
import {Card} from 'components/card/card'
import {PasswordField} from 'components/password-field/password-field'
import {LoadingButton} from 'components/loading-button/loading-button'
import {CheckCircle as CheckCircleIcon, Lock as LockIcon, XOctagon as XOctagonIcon} from 'lucide-react'

function ChangePassword() {
  const {status, error, run} = useAsync()
  const [newPassword, setNewPassword] = React.useState('')
  const state =
    status === 'pending' ? 'loading' : status === 'resolved' ? 'success' : status === 'rejected' ? 'error' : 'idle'

  async function mock() {
    return Promise.resolve()
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    run(mock())
  }

  return (
    <Card>
      <Heading>Change Password</Heading>
      <form onSubmit={handleSubmit}>
        <VStack marginTop={2.5} spacing={2.5} alignItems="end">
          <PasswordField
            label="New password"
            id="new-password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => {
              setNewPassword(event.target.value)
            }}
          />
          <LoadingButton
            state={state}
            text="Change password"
            textLoading="Changing password..."
            textError={error?.message}
            colorScheme="pink"
            colorSchemeError="red"
            colorSchemeSuccess="green"
            ariaText="Change password"
            ariaLoadingAlert="Changing password"
            ariaSuccessAlert="Successfully changed password"
            ariaErrorAlert={`Error Changing password: ${error?.message}`}
            icon={<Icon as={LockIcon} />}
            iconError={<Icon as={XOctagonIcon} />}
            iconSuccess={<Icon as={CheckCircleIcon} />}
            type="submit"
          />
        </VStack>
      </form>
    </Card>
  )
}

export {ChangePassword}
