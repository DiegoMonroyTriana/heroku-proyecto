import { FormReq } from "../../components/compras/FormReq";
import { Navbar } from "../../components/Navbar/Navbar";
import { TareaView } from "../../components/Tareas/TareaView";

export default function  Tareas () {
  const data = {
    descripcion: 'Armar platinas',
    creador: 'Paulo Ramos', 
    importancia: 'Alta',
    tarea:[ {
      id: 1,
      descripcion: 'Pelar cabbles ',
      realizo: 'Raul Silva'
      },
      {
        id: 2,
        descripcion: 'Realizar conexiones',
        realizo: 'Luis Lopez'
      },
      {
        id: 3,
        descripcion: 'Cambiar fuentes',
        realizo: ''
      },
      {
        id: 4, 
        descripcion: 'Atornillar bases',
        realizo: ''
      },
      {
        id: 5,
        descripcion: 'Cambiar fuentes',
        realizo: ''
      },
      {
        id: 6,
        descripcion: 'Cambiar fuentes',
        realizo: ''
      }, 
      {
        id: 7,
        descripcion: 'Cambiar fuentes',
        realizo: ''
      }
  ]
  }
  return (
    <>
    <Navbar/>
    <TareaView {...data}/> 
      <FormReq/>
    </>
  )
}