import { Text, IconButton, Button, Select, Spinner} from '@chakra-ui/react'
import { Modal } from '@nextui-org/react'
import axios from 'axios'
import config from '../../pages/api/config'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'


export function TablaHerramienta () {
  const [herramienta, setHerramienta] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
      setIsLoading(false)
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
      Swal.fire({
        icon: 'success',
        title: 'Asignación exitosa',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        icon: 'error', 
        title: 'Error al asignar',
        showConfirmButton: false,
        timer: 1500
      })
      return (error)
    }
  }
  useEffect(() => {
    cargarHerramienta()
  }, [])
  return (<>{isLoading ? <div className = 'flex content-center justify-center'> <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'/></div>:
  
  <div className="overflow-x-auto p-3 text-center">
  <p className = 'text-2xl text-gray-800'>HERRAMIENTA</p>
  <table className = 'table-auto w-fit md:w-full md:scroll-x '>
      <thead >
          <tr className = 'bg-slate-700 text-white'>
              <th className='justify-center'>NOMBRE</th>
              <th className='justify-center'>MARCA</th>
              <th className='justify-center'>CÓDIGO</th>
              <th className='justify-center'>PORTADOR</th>
              <th className='justify-center'>ASIGNAR</th>
              <th className='justify-center'>DEVOLVER</th>
          </tr>
      </thead>
      <tbody>
      {herramienta.map((herramienta) => (
          <tr className = 'hover:bg-slate-600 hover:text-white' key={herramienta.id}>
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
          </tr>
      ))}
      </tbody>
      
  </table>

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
    }</>
    
  )
}
