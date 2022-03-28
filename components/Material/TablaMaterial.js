import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, IconButton} from '@chakra-ui/react'
import axios from 'axios'
import config from '../../pages/api/config'
import { useState, useEffect } from 'react'
import { Button, Modal, Text } from '@nextui-org/react'
export default function TablaMaterial () {
  const [materiales, setMateriales] = useState([])
  const cargarMateriales = async () => {
    try{
      const response = await axios.get(`${config.URL}material`)
      const result = await response.data
      setMateriales(result)
    }catch (error){
      return error
    }
  }
  
  useEffect(()=>{
    cargarMateriales()
  },[])
  return (
    <div className = 'overflow-x-auto p-3'>
    <Table >
      <TableCaption>Entradas de material</TableCaption>
      <Thead>
        <Tr>
        <Th>Descripción</Th>
        <Th>Proveedor</Th>
        <Th>Cantidad</Th>
        <Th>Orden de compra</Th>
        <Th>Fecha de ingreso</Th>
        <Th>Registrar Salida</Th>
        </Tr>
      </Thead>
      <Tbody>
        {materiales.map((material) => (
          <Tr key = {material.id}>
            <Td>{material.descripcion}</Td>
            <Td>{material.proveedor}</Td>
            <Td>{material.cantidad}</Td>
            <Td>{material.oc}</Td>
            <Td>{material.fecha_ingreso}</Td>
            <Td><IconButton colorScheme = 'teal' variant = 'ghost' icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
</svg>} /></Td> 
          </Tr> 
        ))}
      </Tbody>
    </Table>
    <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
    >
      <Modal.Header>
          <Text id="modal-title" className = 'text-xl'>
            Asignar Herramienta
          </Text>
        </Modal.Header>
        <Modal.Body>
      
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" >
            Cancelar
          </Button>
          <Button auto >
            Asignar
          </Button>
        </Modal.Footer>
    </Modal>
    </div>
  )
}
