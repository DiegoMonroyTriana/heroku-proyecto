import { Navbar } from '../../components/Navbar/Navbar'
import { Container } from '@nextui-org/react'
import { TablaProyectos } from '../../components/proyectos/TablaProyectos'
import { useState, useEffect } from 'react'
import Cookie from 'universal-cookie'
import jwt from 'jsonwebtoken'
import config from '../api/config'
import axios from 'axios'
import { Button } from '@chakra-ui/react'
import { CrearProyecto } from '../../components/proyectos/CrearProyecto'
import { ProyectoCard } from '../../components/proyectos/ProyectoCard'

export default function proyectos () {
  const [crear, setCrear] = useState(false)
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

  const rol = usuarios.rol === 'Lider'
  return (
    <>
      <Navbar/>
      <Container className="mt-9\">
        {rol ? <>{crear ? <><div className='m-3 flex items-center'><Button rightIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
</svg>} colorScheme='teal' variant='outline' onClick = {()=>{setCrear(false)}}>Ver proyectos</Button></div><CrearProyecto {...usuarios}/></> : <><div className='m-3 flex items-center'><Button rightIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0    10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
      </svg>} colorScheme='teal' variant='outline' onClick = {()=>{setCrear(true)}}>Crear proyecto</Button></div><ProyectoCard/></>}</> : 
      <>
      {crear ? <><div className='m-3 flex items-center'><Button rightIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
</svg>} colorScheme='teal' variant='outline' onClick = {()=>{setCrear(false)}}>Ver proyectos</Button></div><CrearProyecto {...usuarios}/></> : <><div className='m-3 flex items-center'><Button rightIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0    10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
      </svg>} colorScheme='teal' variant='outline' onClick = {()=>{setCrear(true)}}>Crear proyecto</Button></div><TablaProyectos/></>}
      </>
      }
      </Container>
    </>
  )
}
