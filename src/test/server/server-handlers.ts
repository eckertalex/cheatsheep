import {match} from 'node-match-path'

let sleep = () => {}
if (process.env.CI) {
  sleep = () => Promise.resolve()
} else if (process.env.NODE_ENV === 'test') {
  sleep = () => Promise.resolve()
} else {
  sleep = (
    t = Math.random() * ls('__cheatsheep_variable_request_time__', 400) + ls('__cheatsheep_min_request_time__', 400)
  ) => new Promise((resolve) => setTimeout(resolve, t))
}

function ls(key: string, defaultVal: number) {
  const lsVal = window.localStorage.getItem(key)
  let val
  if (lsVal) {
    val = Number(lsVal)
  }
  return val && Number.isFinite(val) ? val : defaultVal
}

const handlers = [].map((handler) => {
  // @ts-expect-error
  const originalResolver = handler.resolver
  // @ts-expect-error
  handler.resolver = async function resolver(req, res, ctx) {
    try {
      if (shouldFail(req)) {
        throw new Error('Request failure (for testing purposes).')
      }
      const result = await originalResolver(req, res, ctx)
      return result
    } catch (error) {
      const status = error.status || 500
      return res(ctx.status(status), ctx.json({status, message: error.message || 'Unknown Error'}))
    } finally {
      await sleep()
    }
  }
  return handler
})

function shouldFail(req: any) {
  if (JSON.stringify(req.body)?.includes('FAIL')) return true
  if (req.url.searchParams.toString()?.includes('FAIL')) return true
  if (process.env.NODE_ENV === 'test') return false
  const failureRate = Number(window.localStorage.getItem('__cheatsheep_failure_rate__') || 0)
  if (Math.random() < failureRate) return true
  if (requestMatchesFailConfig(req)) return true

  return false
}

function requestMatchesFailConfig(req: any) {
  function configMatches({requestMethod, urlMatch}: {requestMethod: string; urlMatch: string}) {
    return (requestMethod === 'ALL' || req.method === requestMethod) && match(urlMatch, req.url.pathname).matches
  }
  try {
    const failConfig: {requestMethod: string; urlMatch: string}[] = JSON.parse(
      window.localStorage.getItem('__cheatsheep_request_fail_config__') || '[]'
    )
    if (failConfig.some(configMatches)) return true
  } catch (error) {
    window.localStorage.removeItem('__cheatsheep_request_fail_config__')
  }
  return false
}

export {handlers}
