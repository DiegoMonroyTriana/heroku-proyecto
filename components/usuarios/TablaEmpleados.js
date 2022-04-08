import { Table, Thead, Tbody, Tr, Th, Td, Text, IconButton } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import config from '../../pages/api/config'
import axios from 'axios'
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
    try {
      const response = await axios.delete(`${config.URL}empleados/${id}`)
      const data = await response.data
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    cargarEmpleados()
  }, [])
  return (
        <div className="overflow-x-auto p-3 text-center">
            <Text fontSize ="2xl" color='gray.500' className='p-3'>EMPLEADOS</Text>
            <Table variant='striped' colorScheme='teal' size="sm">
                <Thead >
                    <Tr>
                        <Th className='justify-center'>Nombre</Th>
                        <Th className='justify-center'>Apellido Paterno</Th>
                        <Th className='justify-center'>Apellido Materno</Th>
                        <Th className='justify-center'>Numero de Empleado</Th>
                        <Th className='justify-center'>Puesto</Th>
                        <Th className='justify-center'>Email</Th>
                        <Th className='justify-center'>Rol</Th>
                        <Th className='justify-center'>Editar</Th>
                        <Th className='justify-center'>Eliminar</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {empleados.map((empleado) => (
                    <Tr key={empleado.id}>
                        <Td>{empleado.nombre}</Td>
                        <Td>{empleado.apellido_paterno}</Td>
                        <Td>{empleado.apellido_materno}</Td>
                        <Td>{empleado.numero_empleado}</Td>
                        <Td>{empleado.puesto}</Td>
                        <Td>{empleado.email}</Td>
                        <Td>{empleado.rol}</Td>
                        <Td><IconButton colorScheme='teal' variant='ghost'icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>} onClick={() => editarEmpleado(empleado.id)}/></Td>
                        <Td><IconButton colorScheme='red' variant='ghost' icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>} onClick={() => eliminarEmpleado(empleado.id)}/></Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
        </div>

  )
}
