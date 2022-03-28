import TablaMaterial from "../../components/Material/TablaMaterial"
import { Navbar } from "../../components/Navbar/Navbar"
import { useState, useEffect} from 'react'
import FormMaterial from "../../components/Material/FormMaterial"
import axios from "axios"
import config from "../api/config"
import jwt from 'jsonwebtoken'
import Cookie from 'universal-cookie'
export default function Materiales () {
  const [visible, setVisible] = useState (false)
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
      {rol ? <TablaMaterial /> : <> {visible ? <div ><button className = 'bg-gray-700 text-white hover:bg-gray-500 p-2 m-5 rounded-md w-48' onClick = {()=>setVisible(false)}>Entrada de mercancia</button><TablaMaterial/></div> : <div><button className = 'bg-gray-700 text-white hover:bg-gray-500 p-2 m-5 rounded-md w-48' onClick = {()=>setVisible(true)}>Ver materiales</button><FormMaterial/></div>}</>}
    
    </>
  )
}