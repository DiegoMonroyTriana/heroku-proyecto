import { Navbar } from '../../components/Navbar/Navbar'
import { Cuenta } from '../../components/usuarios/Cuenta'

export default function cuenta () {
  return (
        <>
            <Navbar/>
            <div className=' grid justify-center mt-8'>
                <Cuenta/>
            </div>
        </>
  )
}
