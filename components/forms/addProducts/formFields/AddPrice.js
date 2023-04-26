import { FormLabel, Input } from '@chakra-ui/react'


export const AddPrice = ({inputValueRef}) => {
  return (
    <>
      <FormLabel>Precio *</FormLabel>
      <Input ref={inputValueRef} type="number" />
    </>
  )
}

