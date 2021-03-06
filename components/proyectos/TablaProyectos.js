import { Text, Tooltip } from '@chakra-ui/react'
import { Collapse, Spacer, Input, Progress, Link } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../pages/api/config'
import { Spinner } from '@chakra-ui/react'

export function TablaProyectos () {
  const [proyectos, setProyectos] = useState([])
  const [isloading, setIsloading] = useState (true)
  const progreso = Math.floor(Math.random() * 100)
  const faltan = Math.abs(progreso - Math.floor(Math.random() * 100))
  const formatoFecha = async (data)=> {
    for (let i in data){
      const result = data[i].fecha_fin.substring(0,10)
      data[i].fecha_fin = result
    }
    return data
  }
  const buscarCreador = async (data) => {
    for (let i in data) {
      const creador = await axios.get(`${config.URL}empleados/${data[i].creador_id}`)
      const result = await creador.data[0]
      const nombre = await result.nombre + ' ' + result.apellido_paterno + ' ' + result.apellido_materno
       data[i].creador_id = nombre.toString()
    }
    return data
  }
  const cargarProyectos = async () => {
    try {
      const result = await axios.get(`${config.URL}proyecto`)
      const data = await result.data
      const a = await buscarCreador(data)
      const b = await formatoFecha (a)
      setProyectos(b)
      setIsloading(false)
    } catch (error) {
      return error
    }
  }
  useEffect(() => {
    cargarProyectos()
  }, [])
  return (
    <div className="overflow-x-auto p-3">
            <Text fontSize ="2xl" color='gray.500' className='p-3 text-center'>PROYECTOS</Text> 
            {isloading ? <div className = 'flex justify-center content-center align-middle '><Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/></div> : <>
            {proyectos ? <Collapse.Group shadow >
              {proyectos.map((proyecto) => (
                <Collapse className = "uppercase" key={proyecto.id} title = {proyecto.nombre}>
                <Text className='fs-3 normal-case' >Descripcion: {proyecto.descripcion}</Text>
                <Spacer y = {1}/>
                <label className = 'text-lg'>Fecha de de entrega del proyecto</label>
                <Spacer  y = {0.4}/>
                <Input type = 'date' className='content-fit' value = {proyecto.fecha_fin} onChange={(e)=> e.preventDefault()}/>
                <Spacer y = {1}/>
                <label>L??der del proyecto </label>
                <Spacer y = {0.2} />
                <Text className='fs-3 normal-case'>{proyecto.creador_id}</Text>
                <Spacer y ={1}/>
                <label className = 'text-xl'>Progreso del proyecto</label>
                <Spacer y = {0.3}/>
                <div className = 'grid-cols-3 gap-3 '>
                  <Link href ='/inicio'><a><Tooltip label = 'Ver tareas pendientes'><label className = 'font-bold text-black text-sm hover:text-red-500 cursor-pointer'> Tareas Pendientes: {faltan} </label></Tooltip></a></Link>
                  <Link href ='/inicio'><a><Tooltip label = 'Ver tareas realizadas'><label className = 'font-bold text-black text-sm hover:text-green-500 cursor-pointer ml-4'>Tareas Realizadas: {progreso}</label></Tooltip></a></Link>
                  <Link href ='/inicio'><a><Tooltip label = 'Ver todas las tareas'><label className = 'font-bold text-black text-sm hover:text-blue-500 cursor-pointer ml-4 '> Total de tareas : {faltan + progreso}</label></Tooltip></a></Link>
                </div>  
                <Progress value = {progreso * 100 /(faltan + progreso)} onChange={(e)=> e.preventDefault()} striped color = 'success'/> 
                <span>{Math.floor(progreso * 100 /(faltan + progreso))} %</span>
                <Spacer y ={0.5}/>
               
                </Collapse>
              ))}
            </Collapse.Group> : <Text>No hay proyectos</Text>}
            </>}
            
             
      </div>
  )
}

