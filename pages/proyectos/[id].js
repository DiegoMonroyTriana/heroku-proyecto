import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar } from "../../components/Navbar/Navbar"
import { TareasTable } from "../../components/Tareas/TareasTable";
import config from "../api/config"

 export const getStaticPaths = async () => {
   const res = await fetch(`https://heroku-proyecto.vercel.app${config.URL}proyecto`)
   const data = await res.json()
   const paths = data.map(proyecto =>{
     return {
       params: { id : proyecto.id.toString() }
     }
   })
   return {
     paths,
     fallback: true
    }
 };
 export const getStaticProps = async (context) => {
 
   const id = context.params.id
   const res = await fetch(`https://heroku-proyecto.vercel.app${config.URL}proyecto/${id}`)
   const [data] = await res.json()
   return {
     props: { proyecto: data}
   }
 }

 const Proyecto = ({ proyecto }) => {
   const [creador, setCreador] = useState()
   const [t, setT] = useState([])
   const [empleados, setEmpleados] = useState([])
   const [visible, setVisible] = useState(false)
   const [swt, setSwt] = useState(false)
   const close = () => {setVisible(false)}
   const cargarEmpleados = async () => {
     try {
       setVisible(true)
       const response = await axios.get(`${config.URL}empleados`)
       const data = await response.data
       const emp = proyecto.trabajadores.split(',')
       for(let i in data) {
         if(data[i].id == proyecto.creador_id){
           data.splice(i,1)
         }
         emp.forEach(element => {
           if(data[i].id == element)
           {
             data.splice(i,1)
           }
         })
       }
       setEmpleados(data)
     } catch (error) {
       return error
     }
   }
   const trabajadores = []
   const eliminar = async (id) => {
     const datos = proyecto.trabajadores.split(',')
      for(let i in datos){
        if ( datos[i] == id){
         datos.splice(i, 1)
        }
      }
      proyecto.trabajadores = datos.toString()
     try {
       const data = {
         id: proyecto.id,
         trabajadores: proyecto.trabajadores
       }
       const response = await axios.post(`${config.URL}proyecto/eliminarEmpleado`, data)
       const res = await response.data
       buscarTrabajadores()
       return res
     } catch (error) {
         return error
       }
   }
   const agregarEmpleado = async () => {
     const datos = proyecto.trabajadores.split(',')
     const empleado = document.getElementById('empleado').value
     if(empleado === ""){
       return setVisible(false)
     }else{
     datos.push(empleado)
     proyecto.trabajadores = datos.toString()
      try{
        const data = {
          id: proyecto.id,
          trabajadores: proyecto.trabajadores
        }
        const response = await axios.post(`${config.URL}proyecto/agregarEmpleado`, data);
        buscarTrabajadores()
        return response
      }catch (error){
        return error
      }
     }
   }
   const buscarCreador = async () => {
     try {
       const response = await axios.get(`${config.URL}empleados/${proyecto.creador_id}`)
       const [nombre] = await response.data
       const datos = nombre.nombre + ' ' + nombre.apellido_paterno
       setCreador(datos)
     } catch (error){
       return error
     }
   }
   const buscarTrabajadores = async () => {
     try{
       const datos = proyecto.trabajadores.split(',')
       for(let i in datos){
         const response = await axios.get(`${config.URL}empleados/${datos[i]}`)
         const [nombre] = await response.data
         trabajadores[i] = nombre
       }
       setT(trabajadores)
     } catch (error){
       return error
     }
   }
   useEffect ( ()=> {
     buscarCreador()
     buscarTrabajadores()
   },[])
   return (
     <>
     {proyecto === undefined ? <h1>Cargando...</h1> : <>{proyecto.length === 0 ? '' :  <><Navbar/>
     <div className = 'container pt-4'>
       <p className ='font-bold text-3xl pointer-events-none'>{proyecto.nombre}</p>
       <p className = 'text-xl py-2'>Líder del proyecto {creador}</p>
       <p className = 'text-sm py-2 mb-2'>{proyecto.descripcion}</p>
       <div className='flex justify-center w-full my-4'>
         <button className='bg-gray-700 text-white hover:bg-gray-500 p-2 rounded-l-xl w-36' onClick = {(e)=>{e.preventDefault(); setSwt(false)}}>Tareas</button>
         <button className='bg-gray-700 text-white hover:bg-gray-500 p-2 rounded-r-xl w-36' onClick = {(e)=>{e.preventDefault(); setSwt(true)}}>Empleados</button>
       </div> 
       {swt ? <>{visible ? <><select className = 'bg-gray-700 text-white rounded-sm border-0 p-3' id = 'empleado'  >
               <option defaultValue='' disabled>Agregar...</option>
       {empleados.map((empleado) => (
         <option key = {empleado.id} value = {empleado.id} >{empleado.nombre} {empleado.apellido_paterno} {empleado.apellido_materno}
         </option>
           ))}
         </select>
          <div className = 'm-2 '>
          <button className = 'bg-gray-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md'onClick = {(e)=>{e.preventDefault(); agregarEmpleado()}}>Aceptar</button>
         <button className = 'bg-gray-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md ml-6'onClick={(e)=>{e.preventDefault(); close()}}>Cancelar</button>
       </div></> : <Button id = '' rightIcon = {<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
</svg>}onClick={(e)=>{e.preventDefault(); cargarEmpleados()}}>Agregar Empleado</Button>}
      <div className = 'max-w-10xl mx-auto'>
        <div className = 'flex flex-col'>
          <div className = 'overflow-x-auto shadow-md sm:rounded-lg'>
            <div className = 'inline-block min-w-full align-middle'>
              <div className = 'overflow-hidden'>
               <table className= 'min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700'>
                <thead className = 'bg-gray-100 dark:bg-gray-700'>
                  <tr>
                    <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-200'>Nombre</th>
                    <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200 text-center'>No. Empleado</th>
                    <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>Eliminar</th>
                  </tr>
                </thead>
                <tbody className = 'bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
              
                {t.map((trabajador) => (
                  <tr className = 'hover:bg-gray-100 dark:hover:bg-gray-700' key={trabajador.id}>
                    <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{trabajador.nombre + ' ' +trabajador.apellido_paterno + ' ' + trabajador.apellido_materno }</td>
                     <td className = 'py-4 px-1 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>{trabajador.numero_empleado}</td>
                    <td className = 'py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'><button onClick={()=>eliminar(trabajador.id)}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
   <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
 </svg></button></td>
                   </tr>))}
                 </tbody>
                 </table>
               </div>
             </div>
           </div>
         </div>
       </div></> : <TareasTable {...proyecto}/>}
     </div> </> }</>}
     
     </>
   )
}
 export default Proyecto;

