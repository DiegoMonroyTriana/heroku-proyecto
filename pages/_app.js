import '../styles/globals.css'
import { ChakraProvider  } from '@chakra-ui/react'
import Head  from 'next/head'


function MyApp ({ Component, pageProps }) {
  return (
   <ChakraProvider  >
    <Head>
      <meta name = 'description' content = 'Autor: Diego Monroy Triana, Categoria: Administración' />
      <title>Proyectos</title>
      <link rel="shortcut icon" href="/logo.png" />
    </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
