import { useForm } from 'react-hook-form'
import { Input, Spacer, Text } from '@nextui-org/react'
import { Button } from '@chakra-ui/react'
import axios from 'axios'
import config from '../../pages/api/config'

export default function FormMaterial () {
  const {register, handleSubmit} = useForm()
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${config.URL}material`, data)
      return response
    } catch (error) {
      return error
    }
  }
  return(
    <div className = 'p-6 m-6 text-center justify-items-center'>
      <form onSubmit = {handleSubmit(onSubmit)}>
        <Text size="2em">Registrar entrada de material</Text>
        <Spacer y = {1}/>
        <Input width = '80%' clearable underlined labelPlaceholder='Descripción' {...register('descripcion',{required : true})}/>
        <Spacer y = {1}/>
        <Input width = '80%' clearable underlined labelPlaceholder = 'Proveedor' {...register('proveedor')} />
        <Spacer y = {1}/>
        <Input width = '80%' clearable underlined labelPlaceholder = 'Cantidad' {...register ('cantidad', {required: true})}/>
        <Spacer y = {1}/>
        <Input width='80%' clearable underlined labelPlaceholder = 'Orden de compra' {...register('oc', {required : true})} />
        <Spacer y = {1}/>
        <Input  type = 'date' className = 'min-w-fit' label = 'Fecha de ingreso' {...register('fecha_ingreso', {required: true})}/>
        <Spacer y = {1}/>
        <div className = 'min-w-fit space-x-7'>
          <Button variant='ghost' colorScheme = 'teal' type='reset'>Cancelar</Button>
          <Button variant='ghost' colorScheme = 'whatsapp'type='submit'>Aceptar</Button>
        </div>
      </form>
    </div>
  )
}