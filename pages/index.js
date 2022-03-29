import { SigninForm } from '../components/usuarios/SigninForm'
export default function HomePage () {
  return (
    <div className='flex justify-center items-center content-center min-h-screen w-full'>
      <div className='w-full max-w-md'>
      <SigninForm />
      </div>
    </div>
  )
}
