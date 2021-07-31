import {supabase} from 'context/auth-provider'

const apiURL = process.env.REACT_APP_API_URL

export type ClientRequest<RequestBody> = Omit<RequestInit, 'body'> & {
  data?: RequestBody
  access_token?: string
}

async function client<RequestBody, ResponseBody>(
  endpoint: string,
  {data, access_token, headers: customHeaders, ...customConfig}: ClientRequest<RequestBody> = {}
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers:
      data && access_token
        ? {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            ...customHeaders,
          }
        : data
        ? {
            'Content-Type': 'application/json',
            ...customHeaders,
          }
        : access_token
        ? {
            Authorization: `Bearer ${access_token}`,
            ...customHeaders,
          }
        : customHeaders,
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      await supabase.auth.signOut()
      // refresh the page for them
      window.location.assign(window.location.toString())
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data: ResponseBody = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
