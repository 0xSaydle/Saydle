import {Box, Flex, Input, } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"

const RegistrationForm = () => {
  return (
    <Box>
      <Field label="Enter email address" errorText="Email is required">
        <Input required placeholder="alex@saydle.com"/>
      </Field>
      <Field label="Create a Password" errorText="Email is required">
        <Input required placeholder="alex@saydle.com"/>
      </Field>


    </Box>
  )
}

export default RegistrationForm