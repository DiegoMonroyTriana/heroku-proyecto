import { Collapse, Text } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../pages/api/config'
import { FormTarea } from './FormTarea'

export function TareasTable (props) {
  const [tareas, setTareas] = useState ([])
  const [visible, setVisible] = useState(1)
  const obtenerTareas = async () => {
    try{
      const result = await axios.post(`${config.URL}tareas/proyecto`, {data: props.id})
      const res = await result.data
        for( let i in res){
          const trabajo = await axios.get(`${config.URL}empleados/${res[i].trabajo}`)
          const [nombre] = await trabajo.data
          res[i].trabajo = nombre.nombre +' '+ nombre.apellido_paterno
        }
      setTareas(res)
     } catch (error) {
       return error
     }
  }
  useEffect( ()=> {obtenerTareas()},[visible])
  return (
    <div>
      <div className='flex justify-center w-full my-4'>
        <button className = 'bg-gray-700 text-white hover:brightness-150 p-2 rounded-l-xl hover:shadow-xl' onClick = {(e)=>{e.preventDefault(); setVisible(0)}}>Crear Tarea</button>
        <button className='bg-gray-700 text-white hover:brightness-150 p-2 hover:shadow-xl' onClick = {(e)=>{e.preventDefault(); setVisible(2)}}>Pendientes</button>
        <button className='bg-gray-700 text-white hover:brightness-150 p-2 rounded-r-xl hover:shadow-xl' onClick = {(e)=>{e.preventDefault(); setVisible(1)}}>Realizadas</button>
      </div> 
   
    {visible === 0 ? <FormTarea {...props}/> : <>{visible === 1 ? <Collapse.Group>
      {tareas.map((tarea) =>( tarea.status === 'T' ? 
      <Collapse key = {tarea.id} title = {'Tarea No. '+ tarea.id} className = 'bg-green-100 rounded-md p-6 font-extralight hover:shadow-xl hover:brightness-105 m-1'>
        <p className = 'font-bold'>Terminada</p>
        <Text>{tarea.descripcion}</Text>
        <Text>{tarea.trabajo} </Text>
      </Collapse> : ''
      ))}
    </Collapse.Group> : <Collapse.Group>
      {tareas.map((tarea) =>( tarea.status === 'F' ? 
      <Collapse key = {tarea.id} title = {'Tarea No. '+ tarea.id} className = 'bg-red-100 rounded-md p-6 font-extralight hover:shadow-xl hover:brightness-105 m-1'>
      <p className = 'font-bold'>{tarea.status === 'T' ? 'Terminada' : 'En proceso'}</p>
      <Text>{tarea.descripcion}</Text>
      <Text>{tarea.trabajo} </Text>
      <div className  = 'flex justify-start w-full py-4'>
        <button className = 'bg-gray-800 text-white hover:bg-gray-300 hover:text-gray-900 transition ease-in-out rounded-full p-3 '>Terminar tarea</button>
      </div>
      </Collapse> : ''
      ))}
    </Collapse.Group>}</>
    } 
     
    </div>
  )
}


