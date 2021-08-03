import {Box, BoxProps, forwardRef, useColorModeValue as mode} from '@chakra-ui/react'

const Card = forwardRef<BoxProps, 'div'>((props, ref) => (
  <Box
    paddingX={4}
    paddingY={5}
    rounded="md"
    shadow="lg"
    bgColor={mode('whiteAlpha.800', 'gray.700')}
    width="full"
    ref={ref}
    {...props}
  />
))

Card.displayName = 'Card'
export {Card}
