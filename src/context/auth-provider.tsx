import React from 'react'
import {useQueryClient} from 'react-query'
import {Flex, Spinner} from '@chakra-ui/react'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import {FullPageErrorFallback} from 'components/full-page-error-fallback/full-page-error-fallback'
import {createClient, Session} from '@supabase/supabase-js'

export type User = {
  email: string
  password: string
}

type AuthProviderValue = {
  session: Session | null
  signUp: (user: User) => Promise<void>
  signIn: (user: User) => Promise<void>
  signOut: () => void
  changePassword: (newPassword: string) => Promise<void>
  deleteAccount: () => Promise<void>
}

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY ?? ''

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function bootstrapAppData() {
  return await supabase.auth.session()
}

const AuthContext = React.createContext<AuthProviderValue | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

function AuthProvider({children}: {children: React.ReactNode}) {
  const {data, status, error, isLoading, isIdle, isError, isSuccess, run, setData} = useAsync<Session | null>()
  const queryClient = useQueryClient()

  React.useEffect(() => {
    run(bootstrapAppData())
  }, [run])

  React.useEffect(() => {
    const {data} = supabase.auth.onAuthStateChange((_event, session) => {
      setData(session)
    })

    return () => {
      data?.unsubscribe()
    }
  }, [setData])

  const signIn = React.useCallback(
    (user: User) =>
      supabase.auth.signIn(user).then(({session, error}) => {
        if (error) {
          throw error
        } else {
          setData(session)
        }
      }),
    [setData]
  )

  const signUp = React.useCallback(
    (user: User) =>
      supabase.auth.signUp(user).then(({session, error}) => {
        if (error) {
          throw error
        } else {
          setData(session)
        }
      }),
    [setData]
  )

  const signOut = React.useCallback(
    () =>
      supabase.auth.signOut().finally(() => {
        queryClient.clear()
        setData(null)
      }),
    [queryClient, setData]
  )

  const changePassword = React.useCallback(
    (newPassword: string) =>
      supabase.auth.update({password: newPassword}).then(({user, error}) => {
        if (error) {
          throw error
        } else {
          if (data?.user) {
            setData({
              ...data,
              user: {
                ...data.user,
                ...user,
              },
            })
          }
        }
      }),
    [data, setData]
  )

  const deleteAccount = React.useCallback(async () => {
    const {error} = await supabase.rpc('delete_user')
    if (error) {
      throw error
    } else {
      queryClient.clear()
      setData(null)
    }
  }, [queryClient, setData])

  const value = React.useMemo<AuthProviderValue>(() => {
    return {session: data, signIn, signOut, signUp, changePassword, deleteAccount}
  }, [changePassword, data, deleteAccount, signIn, signOut, signUp])

  if (isLoading || isIdle) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Spinner label="Loading application..." size="xl" />
      </Flex>
    )
  }

  if (isError && error) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function useClient() {
  const {session} = useAuth()
  const access_token = session?.access_token
  return React.useCallback((endpoint, config) => client(endpoint, {...config, access_token}), [access_token])
}

export {AuthProvider, useAuth, useClient, supabase}
