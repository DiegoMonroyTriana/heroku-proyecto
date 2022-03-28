import { Button, AlertDialog, AlertDialogOverlay, AlertDialogBody, AlertDialogContent, AlertDialogFooter } from '@chakra-ui/react'
import { Input, Spacer, Text } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRef, useState } from 'react'
import config from '../../pages/api/config'
export function FormHerramienta () {
  const { handleSubmit, register } = useForm()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }
  const cancelRef = useRef()
  const onSubmit = async (data) => {
    try {
      const response = axios.post(`${config.URL}herramienta`, data)
      setIsOpen(true)
      return (response)
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='container text-center sm:text-center bg-neutral-100 rounded-lg  p-5
        drop-shadow-lg' >
          <Text size="1.5em">Registrar Herramienta</Text>
      <Spacer y ={1.5}/>
        <Input width="80%" clearable underlined labelPlaceholder="nombre" {...register('nombre', { required: true })}/>
            <Spacer y={1.2}/>
            <Input width="80%" clearable underlined labelPlaceholder="marca" {...register('marca', { required: true })}/>
            <Spacer y={1.2}/>
            <Input width="80%" clearable underlined labelPlaceholder="codigo" {...register('codigo', { required: true })}/>
            <Spacer y={1.2}/>
            <Input width="80%" type="number" clearable underlined labelPlaceholder="cantidad" {...register('cantidad', { required: true })}/>
            <Spacer y={1.2}/>

            <div className="flex flex-row place-content-around">
                <Button size="md" colorScheme="gray" type='reset' >Cancelar</Button>
                <Button size="md" colorScheme="whatsapp" type='submit' >Guardar</Button>
            </div>
      </form>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
            < AlertDialogContent>
                <Spacer y={1} />
                <AlertDialogBody className='text-2xl text-center'>Registro correcto</AlertDialogBody>
                <AlertDialogFooter>
                    <Button colorScheme="whatsapp" size="sm" ref={cancelRef} onClick={onClose}>Aceptar</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            <AlertDialogBody>
            </AlertDialogBody>
        </AlertDialogOverlay>
    </AlertDialog>
  </>
  )
}
