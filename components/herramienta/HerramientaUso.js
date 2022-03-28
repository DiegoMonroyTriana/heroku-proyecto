import axios from 'axios'
import { Container } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import Cookie from 'universal-cookie'
import jwt from 'jsonwebtoken'
import config from '../../pages/api/config'
import { motion } from 'framer-motion'
export function HerramientaUso () {
  const [herramienta, setHerramienta] = useState([])
  const [uso, setUso] = useState(true)
  const [ jugar] = useState (false)
  const herramientaUso = async (id) => {
    try {
      const response = await axios.post(`${config.URL}herramienta/current`, id)
      const datos = await response.data
      if (datos.length === 0) {
        setUso(false)
      } else {
        (
          setHerramienta(datos)
        )
      }
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    const cookie = new Cookie()
    const token = cookie.get('session')
    const decoded = jwt.verify(token.token, config.SECRET)
    const userId = decoded.id
    herramientaUso({ portador: userId })
  }, [])
  return (
    <Container className='pt-6'>
      {uso
        ? <>
        <p className = 'py-2 font-bold text-3xl text-center'>Herramientas asignadas</p>
      <div  className = 'py-2 grid sm:text-sm sm:content-center sm:grid-cols-2 sm:gap-2 md:grid-cols-4 md:gap-4 xl:grid-cols-6 xl:gap-6'>
        {herramienta.map((herramienta) => (
      <motion.div drag
      dragConstraints={jugar ? '':{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,}}  className = 'sm:w-68 md:w-44 m-2 text-center rounded-xl bg-slate-800 hover:brightness-125 hover:shadow-xl p-4 pointer-events-auto' key = {herramienta.id}>
        <p className = 'uppercase font-bold text-white' >{herramienta.nombre}</p>
        <p className = 'font-light uppercase text-white'>Codigo: {herramienta.codigo}</p> 
        <p className = 'font-light uppercase text-white'>Marca: {herramienta.marca}</p>
      </motion.div>
        ))}</div></>
        : <p className = 'py-2 font-bold text-3xl text-center'>No tienes herramientas asignadas</p>}

    </Container>
  )
}
