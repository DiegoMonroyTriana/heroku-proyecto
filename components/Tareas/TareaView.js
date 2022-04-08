import { Checkbox, Input, Progress } from '@nextui-org/react'

export function TareaView (props) {
  const tarea = props.tarea
  const progreso = props.tarea
  const total = progreso.length
  var current = []
  for(let i in progreso) {
    if(progreso[i].realizo !== '') {
      current.push('')
    }
    
  }

  const x =Math.floor(( current.length * 100 )/total )
  return (
    <section className = 'flex-1 bg-slate-100 text-gray-900 content-center justify-center text-center m-4 p-5 rounded-lg shadow-lg'>
      <header className='w-full p-2 '>
        <p className = 'text-2xl font-thin py-1 '>{props.descripcion}</p>
        <p className = 'font-thin py-1'>{props.creador}</p>
        <p className = 'text-2xl font-bold py-1 text-red-900'>{props.importancia}</p>
      </header>
      <div className='grid-cols-5-1 m-5'>
        {tarea.map((tarea)=>( tarea.realizo === '' ? <div  key = {tarea.id} className = 'flex justify-start '>
          <Checkbox  /><p className = 'pl-4 sm:text-sm'>{tarea.descripcion}</p></div> :<div  key = {tarea.id} className = 'flex justify-start '>
          <Checkbox checked disabled/><p className = 'pl-4 sm:text-sm'>{tarea.descripcion}</p> <p className = 'pl-3 sm:text-sm'>Realizó: {tarea.realizo}</p></div>
        ))}
      </div>
      <form className = 'w-full flex-1'>
      <Input clearable underline width= '80%' placeholder = 'Agregar un comentario ... ' />
      <span className = 'text-red-800 text-sm px-3'>* Opcional</span>
      <div className = 'w-full py-5'>
      {x >= 66  ?  <Progress  value = {x} color = 'success' status = 'success'/> : <>{x >= 33 ? <Progress  value = {x} color = 'warning' status = 'warning'/> : <Progress value = {x} color = 'error' status = 'error'/>}</>
      }  
      </div>
      <label className  = 'pt-3 font-bold text-xl'>{x} %</label>
     
      <footer className = 'w-full py-4 content-around'>
        <button className  = 'bg-gray-800 text-white hover:bg-gray-600 rounded-md p-2 m-2 w-24' type = 'reset'>Cancelar</button>
        <button className  = 'bg-slate-800 text-white hover:bg-slate-600 rounded-md p-2 m-2 w-24' type = 'submit'>Aceptar</button>
      </footer>
      </form>
    </section>
  )
 }