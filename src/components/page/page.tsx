import {Box, BoxProps, forwardRef} from '@chakra-ui/react'

const Page = forwardRef<BoxProps, 'div'>((props, ref) => (
  <Box maxWidth="container.xl" paddingX={4} paddingY={5} ref={ref} {...props} />
))

Page.displayName = 'Page'
export {Page}
