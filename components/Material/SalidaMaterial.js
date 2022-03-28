import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { ModalEmpleados } from '../herramienta/ModalEmpleados'
export default function SalidaMaterial () {
  const { register, handleSubmit } = useForm()
  const onSubmit = async(data) => {
    try {
      console.log(data)
    }catch (error){
      return error
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input clearable underlined labelPlaceholder = 'Cantidad' {...register('cantidad', {required:true})}/>
      <Input clearable underlined labelPlaceholder = 'Persona que recibe' {...register('entrega', {required: true})}/>
      <ModalEmpleados/>
      <Input type= 'date' label = 'fecha de salida' {...register('fecha_entrega', {required: true})}/>
    </form>
  )
}