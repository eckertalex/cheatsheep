import {setupWorker} from 'msw'
import {handlers} from 'test/server/server-handlers/server-handlers'

const server = setupWorker(...handlers)

server.start({
  quiet: true,
})

export * from 'msw'
export {server}
