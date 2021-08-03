import {rest} from 'msw'

const apiUrl = process.env.REACT_APP_SUPABASE_URL
const authUrl = `${apiUrl}/auth/v1`

const authHandlers = [
  rest.post(`${authUrl}/signup`, async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()

    return res(ctx.status(originalResponse.status), ctx.json(originalResponseData))
  }),
  rest.post(`${authUrl}/token`, async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()

    return res(ctx.status(originalResponse.status), ctx.json(originalResponseData))
  }),
  rest.post(`${authUrl}/logout`, async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)

    return res(ctx.status(originalResponse.status))
  }),
  rest.post(`${authUrl}/user`, async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()

    return res(ctx.status(originalResponse.status), ctx.json(originalResponseData))
  }),
]

export {authHandlers}
