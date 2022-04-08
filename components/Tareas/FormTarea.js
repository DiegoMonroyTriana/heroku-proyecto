import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay } from "@chakra-ui/react";
import { Input, Spacer, Text } from "@nextui-org/react";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from 'react-hook-form'
import config from "../../pages/api/config";

export function FormTarea (props) {
  const { handleSubmit, register } = useForm()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }
  const cancelRef = useRef()
  const onSubmit = async (data) => {
    try {
      data.id_proyecto = props.id
      const fecha = new Date()
      let dia = fecha.getDate()
      let mes = fecha.getMonth() + 1
      let year = fecha.getFullYear()
      data.fecha = (dia + '/' + mes + '/' + year)
      data.status = 'F'
      data.trabajo = 2
      const result = await axios.post(`${config.URL}tareas`, data)
      setIsOpen(true)
      return result
    } catch (error) {
      return error
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className='container text-center sm:text-center bg-neutral-100 rounded-lg  p-5
        drop-shadow-lg' >
          <Text size="1.5em">Crear tarea</Text>
          <Spacer y ={1.5}/>
          <Input width="80%" clearable underlined labelPlaceholder="Descripción de la tarea" {...register('descripcion', { required: true })}/>
            <div className="flex flex-row place-content-around">
                <button type='reset'>Cancelar</button>
                <button type='submit'>Guardar</button>
            </div>
      </form>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
          < AlertDialogContent>
              <Spacer y={1} />
              <AlertDialogBody className='text-2xl text-center'>Registro correcto</AlertDialogBody>
              <AlertDialogFooter>
                  <button ref={cancelRef} onClick={onClose}>Aceptar</button>
              </AlertDialogFooter>
          </AlertDialogContent>
          <AlertDialogBody>
          </AlertDialogBody>
      </AlertDialogOverlay>
  </AlertDialog>
  </>
  )
}