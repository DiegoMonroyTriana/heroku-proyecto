import axios from 'axios'
import config from '../../pages/api/config'
import { useCallback, useState } from 'react'
export function ModalEmpleados () {
  const [empleados, setEmpleados] = useState([])
  const cargarEmpleados = async () => {
    try {
      const response = await axios.get(`${config.URL}empleados`)
      const data = await response.data
      setEmpleados(data)
    } catch (error) {
      return error
    }
  }
  const memoria = useCallback(() => cargarEmpleados())

  return (
    <select className='overflow-auto max-w-md' plasceHolder = 'Asignar ...'>
      {memoria}
      {empleados.map((empleado) => (
        <option key = {empleado.id} value = {empleado.id}>{empleado.nombre} {empleado.apellido_paterno} {empleado.apellido_materno}</option>
      ))}
    </select>
  )
}
