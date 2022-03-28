import { Text, IconButton, Button, Select} from '@chakra-ui/react'
import { Modal, Pagination} from '@nextui-org/react'
import axios from 'axios'
import config from '../../pages/api/config'
import { useEffect, useState } from 'react'

export function TablaHerramienta () {
  const [herramienta, setHerramienta] = useState([])
  const [visible, setVisible] = useState(false)
  const [asignar] = useState ({id: '', portador: ''})
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
  const nombre = async (id)=> {
    try {
      const response = await axios.get(`${config.URL}empleados/${id}`)
      const [data] = await response.data
      return data.nombre + ' ' + data.apellido_paterno
    } catch ( error ) {
      return error
    }
  }
  const cargarHerramienta = async () => {
    try {
      const response = await axios.get(`${config.URL}herramienta`)
      const data = await response.data
      for(let i in data){
        if(!data[i].portador){
          data[i].portador = 'Almacén'
        }else{
          data[i].portador = await nombre(data[i].portador)
        }
      }
      setHerramienta(data)
    } catch (error) {
      console.log(error)
    }
  }
  const eliminarHerramienta = async (id) => {
    try {
      await axios.delete(`${config.URL}herramienta/${id}`)
    } catch (error) {
      console.log(error)
    }
  }
  const closeHandler = () => {
    setVisible(false)
  }
  const asig = (d) => {
    cargarEmpleados()
    asignar.id = d
    setVisible(true)
  }
  const asignarHerramienta = async () => {
    try {
      await axios.post(`${config.URL}herramienta/asignar`, asignar)
      setVisible(false)
      cargarHerramienta()
    } catch (error) {
      return (error)
    }
  }
  useEffect(() => {
    cargarHerramienta()
  }, [])
  return (
    <div className="overflow-x-auto p-3 text-center">
    <p className = 'text-2xl text-gray-800'>HERRAMIENTA</p>
    <table className = 'table-auto'>
        <thead >
            <tr>
                <th className='justify-center'>Nombre</th>
                <th className='justify-center'>Marca</th>
                <th className='justify-center'>Código</th>
                <th className='justify-center'>portador</th>
                <th className='justify-center'>Asignar</th>
                <th className='justify-center'>Devolver</th>
                <th className='justify-center'>Eliminar</th>
            </tr>
        </thead>
        <tbody>
        {herramienta.map((herramienta) => (
            <tr key={herramienta.id}>
                <td>{herramienta.nombre}</td>
                <td>{herramienta.marca}</td>
                <td>{herramienta.codigo}</td>
                <td>{herramienta.portador}</td>
                <td><IconButton colorScheme='teal' variant='ghost'icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
</svg>} onClick={(e) => {e.preventDefault();  asig(herramienta.id)}}/></td>
                <td><IconButton colorScheme = 'teal' variant = 'ghost' icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
</svg>} onClick = {(e) => {e.preventDefault(); asignar.id = herramienta.id; asignar.portador = 0; asignarHerramienta()}}/></td>
                <td><IconButton colorScheme='red' variant='ghost' icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>} onClick={(e) => {e.preventDefault(); eliminarHerramienta(herramienta.id)}}/></td>

            </tr>
        ))}
        </tbody>
        
    </table>
    <Pagination bordered  total={10} initialPage ={1}/>
    <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={visible}
        onClose={closeHandler}>
      <Modal.Header>
          <Text id="modal-title" className = 'text-xl'>
            Asignar Herramienta
          </Text>
        </Modal.Header>
        <Modal.Body>
        <Select placeHolder = 'Asignar ...' id = 'empleado'  >
          {empleados.map((empleado) => (
           <option key = {empleado.id} value = {empleado.id} className = 'overflow'>{empleado.nombre} {empleado.apellido_paterno} {empleado.apellido_materno}</option>
          ))}
        </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Cancelar
          </Button>
          <Button auto onClick={() =>{const portador = document.getElementById('empleado').value 
                                      asignar.portador = portador
                                      asignarHerramienta()
                  
                                    }
                                      }>
            Asignar
          </Button>
        </Modal.Footer>
    </Modal>
</div>
  )
}
