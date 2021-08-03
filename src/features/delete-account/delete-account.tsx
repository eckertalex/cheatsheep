import {Heading, Icon} from '@chakra-ui/react'
import {useAsync} from 'utils/hooks'
import {Card} from 'components/card/card'
import {LoadingButton} from 'components/loading-button/loading-button'
import {CheckCircle as CheckCircleIcon, UserMinus as UserMinusIcon, XOctagon as XOctagonIcon} from 'lucide-react'
import {useAuth} from 'context/auth-provider'

function DeleteAccount() {
  const {deleteAccount} = useAuth()
  const {status, error, run} = useAsync()
  const state =
    status === 'pending' ? 'loading' : status === 'resolved' ? 'success' : status === 'rejected' ? 'error' : 'idle'

  function handleClick() {
    run(deleteAccount())
  }

  return (
    <Card>
      <Heading>Delete Account</Heading>
      <LoadingButton
        marginTop={2.5}
        onClick={handleClick}
        state={state}
        text="Delete Account"
        textLoading="Deleting account..."
        textError={error?.message}
        colorScheme="red"
        colorSchemeError="red"
        colorSchemeSuccess="green"
        ariaText="Delete Account"
        ariaLoadingAlert="Deleting account"
        ariaSuccessAlert="Successfully deleted account"
        ariaErrorAlert={`Error deleting account: ${error?.message}`}
        icon={<Icon as={UserMinusIcon} />}
        iconError={<Icon as={XOctagonIcon} />}
        iconSuccess={<Icon as={CheckCircleIcon} />}
      />
    </Card>
  )
}

export {DeleteAccount}
