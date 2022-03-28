import { Input, Spacer, Text } from '@nextui-org/react'
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import React, { useEffect } from 'react'
import Cookie from 'universal-cookie'
import config from '../../pages/api/config'

export function SigninForm () {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      const result = await axios.post(`${config.URL}signin`, data)
      const cookie = new Cookie()
      cookie.set('session', result.data, { path: '/' })
      window.location.href = '/inicio'
    } catch (error) {
      setIsOpen(true)
    }
  }

  const deleteCookie = () => {
    const cookie = new Cookie()
    cookie.remove('session', { path: '/' })
  }
  useEffect(() => {
    deleteCookie()
  }, [])
  return (
        <>
        <form onSubmit= {handleSubmit(onSubmit)} className='container text-center sm:text-center rounded-lg  p-5
        drop-shadow-lg'>
            <Text size="2em">Iniciar Sesión</Text>
            <Spacer y={1.5} />
            <Input width="80%" type = 'email' clearable underlined labelPlaceholder="Email" {...register('email', { required: true })} />
            <Spacer y={1.5} />
            <Input.Password width="80%" clearable underlined labelPlaceholder="Contraseña" {...register('password', { required: true })} />
            <Spacer y={1.5} />
            <div className = "flex place-content-center">
                 <Button type='submit' variant= "solid" colorScheme="whatsapp">Iniciar Sesión</Button>
            </div>
        </form>

        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay size="sm">
          <AlertDialogContent>
          <Spacer y={1} />
            <AlertDialogBody className='text-2xl text-center'>Datos incorrectos</AlertDialogBody>
            <AlertDialogFooter>
              <Button size="sm" ref={cancelRef} onClick={onClose}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </>
  )
}
