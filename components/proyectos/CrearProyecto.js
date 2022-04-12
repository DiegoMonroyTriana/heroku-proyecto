import { Input, Spacer, Text } from '@nextui-org/react'
import { Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../pages/api/config'
import Swal from 'sweetalert2'

export function CrearProyecto (props) {
  const [lista, setLista] = useState([])
  const cargarEmpleados = async () => {
    try {
      const response = await axios.get(`${config.URL}empleados`)
      const data = await response.data
      setLista(data)
    } catch (error) {
      return error
    }
  }
  useEffect(() => { cargarEmpleados() }, [])
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      data.creador_id = props.id
      data.trabajadores = data.trabajadores.toString()
      await axios.post(`${config.URL}proyecto`, data)
      Swal.fire({
        icon: 'success', 
        title: 'Proyecto creado satisfactoriamente', 
        showConfirmButton: false, 
        timer: 1500
      })
      window.href = '/inicio'
      return 
    } catch (error) {
      Swal.fire({ 
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al crear el proyecto',
        confirmButtonText: 'Aceptar'
      })
      return 
    }
  }

  return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className='container text-center sm:text-center bg-neutral-100 rounded-lg  p-5
        drop-shadow-lg'>
            <Text size="2em">Crear proyecto</Text>
            <Spacer y={1.5} />
            <Text size = "1.5em">{props.nombre + ' ' + props.apellido_paterno}</Text>
            <Spacer y={1.5} />
            <Input width="80%" clearable underlined labelPlaceholder="Nombre del proyecto " {...register('nombre', { required: true })} />
            <Spacer y={1.5} />
            <Input width="80%" clearable underlined labelPlaceholder="Descripcion breve del proyecto" {...register('descripcion', { required: true })} />
            <Spacer y={1.5} />
            <Input width="80%" clearable underlined labelPlaceholder="Materiales a utilizar" {...register('materiales', { required: true })} />
            <Spacer y={1.5} />
            <div className="flex col-span-2 justify-evenly">
                <Input className='min-w-fit' type="date" underlined label="Fecha de inicio " {...register('fecha_inicio', { required: true })} />
                <Input className='min-w-fit' type="date" underlined label="Fecha de fin " {...register('fecha_fin', { required: true })} />
            </div>
            <Spacer y={1.5} />
            <Text> Asignar trabajadores</Text>
            <Spacer y = {1.5}/>
            <div className = "grid grid-cols-3 gap-3">

                {lista.map((lst) => (
                    <div key={lst.id} className="text-left" >
                       <label className='max-w-sm mx-auto p-1'>
                       <input type="checkbox" className = "text-indigo-500 mr-2 focus:ring-indigo-400 focus:ring-opacity-25 border border-gray-300 rounded" value= {lst.id} {...register('trabajadores')}/>
                           {lst.nombre} {lst.apellido_paterno} {lst.apellido_materno}
                        </label>
                    </div>
                ))}
            </div>
            <Button colorScheme = "whatsapp" type='submit'>Crear </Button>
        </form>
    </>
  )
}
