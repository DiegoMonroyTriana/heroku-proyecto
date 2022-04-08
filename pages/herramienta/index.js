import { useState, useEffect } from 'react'
import { FormHerramienta } from '../../components/herramienta/FormHerramienta'
import { TablaHerramienta } from '../../components/herramienta/TablaHerramienta'
import { Navbar } from '../../components/Navbar/Navbar'
import { HerramientaUso } from '../../components/herramienta/HerramientaUso'
import axios from 'axios'
import config from '../api/config'
import Cookie from 'universal-cookie'
import jwt from 'jsonwebtoken'


export default function Inicio () {
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

  const rol = usuarios.rol === 'Admin'
  return (
      <>
      <Navbar/>
        {rol ?  <>
        {crear ? <><button className = 'bg-gray-700 text-white hover:bg-gray-500 p-2 m-5 rounded-md w-48' onClick={()=>setCrear(false)}>Ver herramientas</button> <TablaHerramienta/></> :<><button className = 'bg-gray-700 text-white hover:bg-gray-500 p-2 m-5 rounded-sm w-48' onClick={()=>setCrear(true)}>Registrar herramienta</button> <FormHerramienta/></>}</> : <HerramientaUso/> }
      </>

  )
}
