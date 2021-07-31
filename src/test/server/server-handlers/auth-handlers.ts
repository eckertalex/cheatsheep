import {rest} from 'msw'

const apiUrl = process.env.REACT_APP_SUPABASE_URL
const authUrl = `${apiUrl}/auth/v1`

const authHandlers = [
  rest.post<{email: string; password: string}>(`${authUrl}/signup`, async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()

    return res(ctx.json(originalResponseData))
  }),
  rest.post<{email: string; password: string}>(`${authUrl}/token`, async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()

    return res(ctx.json(originalResponseData))
  }),
  rest.post(`${authUrl}/logout`, async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()

    return res(ctx.json(originalResponseData))
  }),
]

export {authHandlers}
