import { useState, useEffect } from 'react'
import config from '../../pages/api/config'
import axios from 'axios'
import Swal from 'sweetalert2'
export function TablaEmpleados () {
  const [empleados, setEmpleados] = useState([])
  const cargarEmpleados = async () => {
    try {
      const response = await axios.get(`${config.URL}empleados`)
      const data = await response.data
      setEmpleados(data)
    } catch (error) {
      console.log(error)
    }
  }
  const editarEmpleado = async (id) => {
    try {
      console.log(id)
    } catch (error) {
      console.log(error)
    }
  }
  const eliminarEmpleado = async (id) => {

      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.value) {
          const response = axios.delete(`${config.URL}empleados/${id}`)
          console.log(response.data)
          cargarEmpleados()
          Swal.fire(
            'Eliminado!',
            'El empleado ha sido eliminado.',
            'success'
          )
        }
      })
  }
  useEffect(() => {
    cargarEmpleados()
  }, [])
  return (

    <div className = 'max-w-10xl mx-auto'>
    <div className = 'flex flex-col'>
      <div className = 'overflow-x-auto shadow-md sm:rounded-lg'>
        <div className = 'inline-block min-w-full align-middle'>
          <div className = 'overflow-hidden'>
           <table className= 'min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700'>
            <thead className = 'bg-gray-100 dark:bg-gray-700'>
              <tr>
                <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-200'>Nombre</th>
                <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200 text-center'>Apellido Paterno</th>
                <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>Apellido Materno</th>
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>Numero de empleador</th>
           
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>Puesto</th>
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>Email</th>
             
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>Rol</th>
            
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>Editar</th>
            
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>Eliminar</th>
              </tr>

            </thead>
            <tbody className = 'bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
            {empleados.map((empleado) => (
                    <tr className = 'hover:bg-gray-100 dark:hover:bg-gray-700' key={empleado.id}>
                        <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.nombre }</td>
                        <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.apellido_paterno }</td>
                        <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.apellido_materno }</td>
                        <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.numero_empleado }</td>
                        <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.puesto }</td>
                        <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.email }</td>
                        <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.rol }</td>
                        <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'><button onClick={()=> editarEmpleado()}>Edit</button></td>
                          <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'><button onClick={()=>eliminarEmpleado(empleado.id)}> delete</button></td> </tr>
                ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>
  </div>


  )
}
