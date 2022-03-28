import { useState, useEffect } from 'react'
import { FormHerramienta } from '../../components/herramienta/FormHerramienta'
import { TablaHerramienta } from '../../components/herramienta/TablaHerramienta'
import { Navbar } from '../../components/Navbar/Navbar'
import { Switch } from '@nextui-org/react'
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

  const rol = usuarios.rol === 'Empleado' || usuarios.rol === 'Lider'
  return (
      <>
      <Navbar/>
        {rol ? <HerramientaUso/> : <><HerramientaUso/><Switch shadow color="primary" animated={false} checked={true} onChange={(e) => {
          e.preventDefault()
          if (crear) {
            setCrear(false)
          } else { setCrear(true) }
        }}/>
        {crear ? <TablaHerramienta/> : <FormHerramienta/>}</>}
      </>

  )
}
