import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import config from '../../pages/api/config'
import { useState, useEffect } from 'react'
import { Button, Modal, Text } from '@nextui-org/react'
export default function TablaMaterial () {
  const [materiales, setMateriales] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const cargarMateriales = async () => {
    try{
      const response = await axios.get(`${config.URL}material`)
      const result = await response.data
      setMateriales(result)
      setIsLoading(false)
    }catch (error){

      return error
    }
  }
  
  useEffect(()=>{
    cargarMateriales()
  },[])
  return ( <>{isLoading ? <div className='flex content-center justify-center'><Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
  /></div> :
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
  </div>}</>
    
  )
}
