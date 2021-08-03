import {Box, BoxProps, forwardRef, useColorModeValue} from '@chakra-ui/react'

const Card = forwardRef<BoxProps, 'div'>((props, ref) => {
  const bgColor = useColorModeValue('whiteAlpha.800', 'gray.700')
  return <Box paddingX={4} paddingY={5} rounded="md" shadow="lg" bgColor={bgColor} width="full" ref={ref} {...props} />
})

Card.displayName = 'Card'
export {Card}
