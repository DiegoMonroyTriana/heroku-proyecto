import { Input, Spacer, Text } from '@nextui-org/react'
import { Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import React, { useEffect } from 'react'
import Cookie from 'universal-cookie'
import config from '../../pages/api/config'
import Swal from 'sweetalert2'

export function SigninForm () {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      const result = await axios.post(`${config.URL}signin`, data)
      const cookie = new Cookie()
      cookie.set('session', result.data, { path: '/' })
      window.location.href = '/inicio'
    } catch (error) {
      Swal.fire({
        title: 'Usuario o contraseña incorrectos',
        text: 'vovler a intentarlo',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
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
            <Input.Password width="80%" clearable underlined labelPlaceholder="Contraseña" required {...register('password', { required: true })} />
            <Spacer y={1.5} />
            <div className = "flex place-content-center">
                 <Button type='submit' variant= "solid" colorScheme="whatsapp">Iniciar Sesión</Button>
            </div>
        </form>
      </>
      
  )
}
