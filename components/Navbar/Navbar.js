import Link from 'next/link'
import { Drawer, DrawerBody, DrawerFooter, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, DrawerHeader, Tooltip } from '@chakra-ui/react'
import Cookie from 'universal-cookie'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import config from '../../pages/api/config'
import { useState, useEffect, useRef } from 'react'
import moment from 'moment'
export function Navbar () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const fecha = moment().format('LT')

  const [usuarios, setUsuarios] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    numero_empleado: '',
    puesto: '',
    email: '',
    rol: '',
    id: ''
  })
  const saludo = `Hola ${usuarios.nombre + ' ' + usuarios.apellido_paterno}`
  const data = async (userId) => {
    try {
      const response = await axios.get(`${config.URL}empleados/` + userId)
      const datos = await response.data[0]
      setUsuarios(datos)
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
  const role = usuarios.rol !== 'Empleado'
  return (

    <nav className='grid grid-cols-3 w-full bg-gray-900 p-3'>

     <Link href='/inicio' ><a><Tooltip label = 'Inicio' fontSize='md' ><img width='50px' height='50px' className='ml-3 cursor-pointer'src='/logo.png' alt='terzett'/></Tooltip></a></Link>
      <span className='inline-flex text-center items-center place-content-center text-xl text-white font-bold tracking-wide '>{fecha}</span>
      <button onClick={onOpen} ref={btnRef} className=' inline-flex p-3 hover:bg-slate-700 rounded text-white ml-auto hover:text-white outline-none'>
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{saludo}</DrawerHeader>
          <DrawerBody>
            <Link href= '/inicio'><a className = 'inline-flex hover:bg-slate-800 text-blck ml-auto hover:text-white outline-none w-full p-2'>Inicio</a></Link>
            <Link href='/cuenta'><a className=' inline-flex  hover:bg-slate-800  text-black ml-auto hover:text-white outline-none w-full p-2'>Cuenta</a></Link>
            {role ? <Link href='/proyectos'><a className=' inline-flex  hover:bg-slate-800  text-black ml-auto hover:text-white outline-none w-full p-2'>Administración de proyectos</a></Link> : null}
            {role ? <Link href='/gestion'><a className=' inline-flex  hover:bg-slate-800  text-black ml-auto hover:text-white outline-none w-full p-2'>Administración de usuarios</a></Link> : null}
            <Link href='/herramienta'><a className=' inline-flex  hover:bg-slate-800  text-black ml-auto hover:text-white outline-none w-full p-2'>Herramienta</a></Link>
            <Link href='/materiales'><a className = 'inline-flex hover:bg-slate-800 text-black ml-auto hover:text-white outline-none w-full p-2'>Materiales</a></Link>
            <Link href='/'><a className=' inline-flex  hover:bg-slate-800  text-black ml-auto hover:text-white outline-none w-full p-2'>Salir</a></Link>
          </DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </nav>

  )
}
