import { SignupForm } from '../../components/usuarios/SignupForm'
import { Navbar } from '../../components/Navbar/Navbar'
import { Button } from '@nextui-org/react'
import { TablaEmpleados} from '../../components/usuarios/TablaEmpleados'
import { useState } from 'react'
export default function Gestionar () {

  const [visible, setVisible] = useState(false)
  return (
    <>
    <Navbar/>
    <div className="overflow-x-auto p-3 text-center content-center">
    {visible ?<><Button  auto color="secondary" className = 'm-4'rounded bordered onClick={()=>setVisible (false)}>Ver usuarios</Button> <SignupForm/></> : <><Button className = 'm-4' auto color="secondary" rounded bordered onClick={()=>setVisible (true)}>Crear usuario</Button> <TablaEmpleados/></>} 
     
    </div>
    
    </>
  )
}
