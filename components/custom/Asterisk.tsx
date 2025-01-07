import { Text } from '@chakra-ui/react'

interface AsteriskProps {
  color: string;
}


const Asterisk = ({color}:AsteriskProps ) => {
  return (
    <Text color={color} >*</Text>
  )
}

export default Asterisk