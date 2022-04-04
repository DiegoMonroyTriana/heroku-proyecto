import { Text, Modal, Input, Spacer } from '@nextui-org/react'
import { Button, SkeletonCircle, SkeletonText} from '@chakra-ui/react'
import Cookie from 'universal-cookie'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import config from '../../pages/api/config'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
export function Cuenta () {
  const [usuarios, setUsuarios] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    numero_empleado: '',
    puesto: '',
    email: '',
    rol: '',
    id: '',
    avatar: ''
  })
  const [ isLoading, setIsLoading ] = useState(true) 
  const [passvbl, setPassvbl] = useState(false)
  const handlerVisible = () => {
    setPassvbl(true)
  }
  const { handleSubmit, register } = useForm()
  const onSubmit = async (data) => {
    try {
      data.id = usuarios.id
      console.log(data)
      const response = await axios.post(`${config.URL}empleados/changePass`, data)
      setPassvbl(false)
      return response
    } catch (error) {
      return error
    }
  }
  const closeHandler = () => {
    setPassvbl(false)
  }

  const data = async (userId) => {
    try {
      const response = await axios.get(`${config.URL}empleados/` + userId)
      const datos = await response.data[0]
      const avatar = datos.nombre.charAt(0) + datos.apellido_paterno.charAt(0)
      datos.avatar = avatar
      setUsuarios(datos)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const cookie = new Cookie()
    const token = cookie.get('session')
    const decoded = jwt.verify(token.token, config.SECRET)
    const userId = decoded.id
    data(userId)
  }, [])

  return (
        <div className='grid-cols-1 m-3 p-9 rounded-lg drop-shadow-2x bg-gray-50 justify-items-start'>
          { isLoading ? <>  <SkeletonCircle size='70' /> <SkeletonText mt='4' noOfLines={5} spacing='5' /></> : <><motion.div initial = {{scale: 0}} animate = {{scale: 1, transition: {duration: 0.5}}} key={usuarios.id} className = "max-w-screen-md text-left">
              <header className = 'flex justify-center w-full pb-4'>
                <motion.div initial = {{scale : 0, rotate: 45}} animate = {{scale : 1,  rotate:0, transition : {duration: 0.3}}}className='bg-gray-700 rounded-full  text-white text-xl justify-center w-16 h-16 flex items-center text-2xl'>{usuarios.avatar}</motion.div>
              </header>
                <p className = 'font-bold text-xl'>{usuarios.nombre} {usuarios.apellido_paterno} {usuarios.apellido_materno} </p>
                <Spacer y={1}/>
                <p className = 'text-xl' >Numero de Empleado: {usuarios.numero_empleado}</p>
                <Spacer y={1}/>
                <p className = 'text-xl '>Puesto: {usuarios.puesto}</p>
                <Spacer y={1}/>
                <p className = 'text-xl'>Email: {usuarios.email}</p>
                <Spacer y={1.5}/>
            </motion.div>
            <footer className = 'flex justify-center w-full'>
            <button className = 'bg-gray-700 hover:bg-gray-400 text-white font-semibold rounded-md p-3' onClick={handlerVisible}>Cambiar contraseña</button>
            </footer></>}
            
            
            <Modal closeButton aria-labelledby="modal-title" open={passvbl} onClose={closeHandler}>
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Cambia tu contraseña </Text>
                </Modal.Header>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Contraseña"
                        name='password'
                        {...register('password', { required: true })}
                    />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Confirmar contraseña"
                        name='passwordConfirm'
                        {...register('confirm', { required: true })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button colorScheme="teal" type='submit'>
                        Guardar
                    </Button>
                </Modal.Footer>
                    </form>
            </Modal>
        </div>
  )
}
