import { useState, useEffect } from 'react'
import config from '../../pages/api/config'
import axios from 'axios'
import { Collapse, Progress, Spacer} from '@nextui-org/react'
import { Skeleton } from '@chakra-ui/react'
import Cookie from 'universal-cookie'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function ProyectoCard () {
  const [misproyectos] = useState([])
  const [isloading, setIsloading] = useState (true)
  const [isloading2, setIsloading2] = useState (true)
  const progreso = Math.floor(Math.random() * 100)
  const faltan = Math.abs(progreso - Math.floor(Math.random() * 100))
  const formatoFecha = async (data)=> {
    for (let i in data){
      const result = data[i].fecha_fin.substring(0,10)
      data[i].fecha_fin = result
    }
    return data
  }
  function tusProyectos (data)  {
    const userId = getId()
    for (let i in data) {
      if(data[i].creador_id == userId ){
        misproyectos[i] = data[i]
      }else{
        const trabajo = data[i].trabajadores.split(',')

        for ( let j in trabajo) {
        if(userId == trabajo[j]){
            misproyectos[i] = data[i]
           }
      }
      }
    }
    if(misproyectos.length!== 0 || misproyectos.length!== undefined){
      setIsloading2(false)
      setIsloading(true)
    }
  }
  const buscarCreador = async (data) => {
    for (let i in data) {
      const creador = await axios.get(`${config.URL}empleados/${data[i].creador_id}`)
      const result = await creador.data[0]
      const nombre = result.nombre + ' ' + result.apellido_paterno + ' ' + result.apellido_materno
      data[i].nombre_creador = nombre.toString()
    }
    return data
  }
  const cargarProyectos = async () => {
    try {
      const result = await axios.get(`${config.URL}proyecto`)
      const data = await result.data
      const a = await buscarCreador(data)
      const b = await formatoFecha (a)
      tusProyectos(b)
    } catch (error) {
      return error
    }
  }
  const getId = () => { 
    const cookie = new Cookie()
    const token =  cookie.get('session')
    const decoded = jwt.verify(token.token, config.SECRET)
    const userId =  decoded.id
    return userId
  }
  useEffect(() => {
    cargarProyectos()
  },[])
  return (
    <div className = 'pt-5'>
      { isloading2 ? <div className = 'flex flex-col justify-center items-center'> 
  <Skeleton height='50px' width= '80%' />
  <Spacer y= {0.4}/>
  <Skeleton height='50px' width= '80%'/>
  <Spacer y= {0.4}/>
  <Skeleton height='50px' width= '80%' />
 </div>: <>
      {isloading ? <motion.div initial={{opacity: 0 }} animate = {{opacity:1, transition: {duration : 0.3}}}className = 'container'> <p className="text-4xl font-normal text-pink-800 text-center">
  Aún no tienes proyectos 
</p></motion.div>:<div className = 'container'> <Collapse.Group shadow >
              {misproyectos.map((proyecto) => (
                <Collapse className = "uppercase font-extralight text-xl" key={proyecto.id} title = {proyecto.nombre}>
                <label className='text-md normal-case font-bold' >Descripcion </label>
                <Spacer y = {0.5}/>
                <lablel >{proyecto.descripcion}</lablel>
                <Spacer y = {1}/>
                <label className = 'text-md font-bold'>Fecha de de entrega del proyecto</label>
                <Spacer  y = {0.2}/>
                <label className = 'text-md'>{proyecto.fecha_fin}</label>
                <Spacer y = {1}/>
                <label className = 'font-bold'>Líder del proyecto </label>
                <Spacer y = {0.2} />
                <label className='text-md'>{proyecto.nombre_creador}</label>
                <Spacer y ={1}/>
                <label className = 'text-md font-bold'>Progreso del proyecto</label>
                <Spacer y = {0.3}/>
                <div className = 'grid-cols-3 gap-3 '>
                  <label className = ' hover:text-red-500 cursor-pointer'> Tareas Pendientes: {faltan} || </label>
                  <label className = ' hover:text-green-500 cursor-pointer'> Tareas Realizadas: {progreso} || </label>
                 <label className = ' hover:text-blue-500 cursor-pointer '> Total de tareas : {faltan + progreso}</label>
                </div>  
                <Progress value = {progreso * 100 /(faltan + progreso)} readOnly striped color = 'success'/> 
                <span>{Math.floor(progreso * 100 /(faltan + progreso))} %</span>
                <Spacer y ={0.5}/>
                <Link href= {'proyectos/' + proyecto.id}><a className = 'bg-gray-700 text-white hover:bg-gray-500 p-2 rounded m-3 w-56' >Detalles</a></Link> 
                </Collapse>
              ))}
            </Collapse.Group> </div>}
      </>}
     
    </div>
  )
}
