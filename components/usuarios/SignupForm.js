import { Input, Spacer, Radio, Text } from '@nextui-org/react'
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogBody, AlertDialogContent, AlertDialogFooter } from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import config from '../../pages/api/config'
import axios from 'axios'
export function SignupForm () {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      data.rol = value
      await axios.post(`${config.URL}signup`, data)
    } catch (error) {
      console.log(error)
    }
  }
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }
  const cancelRef = useRef()

  const [value, setValue] = useState('Empleado')

  return (
        <form onSubmit={handleSubmit(onSubmit)} className='container text-center sm:text-center bg-neutral-100 rounded-lg  p-5 drop-shadow-lg' >
            <Text size="2em">Registrar Usuario</Text>
            <Spacer y={1.5} />
            <Input width="80%" clearable underlined labelPlaceholder="Nombre " {...register('nombre', { required: true })} />
            <Spacer y={1.5} />
            <Input width="80%" clearable underlined labelPlaceholder="Apellido Paterno" {...register('apellido_paterno', { required: true })} />
            <Spacer y={1.5} />
            <Input width="80%" clearable underlined labelPlaceholder="Apellido Materno" {...register('apellido_materno', { required: true })} />
            <Spacer y={1.5} />
            <Input width="80%" type='email' clearable underlined labelPlaceholder="Email" {...register('email', { required: true })} />
            <Spacer y={1.5} />
            <Input.Password width="80%" clearable underlined labelPlaceholder="Contraseña" {...register('password', { required: true })} />
            <Spacer y={1.5} />
            <Input width="80%" type="number" clearable underlined labelPlaceholder="Numero de Empleado" {...register('numero_empleado', { required: true })} />
            <Spacer y={1.5} />
            <Input width="80%" clearable underlined labelPlaceholder="Puesto" {...register('puesto', { required: true })} />
            <Spacer y={1.5} />
            <Radio.Group row className='place-content-evenly' onChange={setValue} value={value} >
                <Radio size="sm" color="success" value="Admin" >Administrador</Radio>
                <Radio size="sm" color="success" value="Lider">Lider</Radio>
                <Radio size="sm" color="success" value="Empleado" >Empleado</Radio>
            </Radio.Group>
            <Spacer y={1.5} />
            <div className="flex flex-row place-content-around">
                <Button size="md" colorScheme="gray" type='reset' >Cancelar</Button>
                <Button size="md" colorScheme="whatsapp" type='submit' onClick={() => setIsOpen(true)} >Guardar</Button>
            </div>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    < AlertDialogContent>
                        <Spacer y={1} />
                        <AlertDialogBody className='text-2xl text-center'>Empleado guardado satisfactoriamente </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme="whatsapp" size="sm" ref={cancelRef} onClick={onClose}>Aceptar </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    <AlertDialogBody>
                    </AlertDialogBody>
                </AlertDialogOverlay>
            </AlertDialog>
        </form>
  )
}
