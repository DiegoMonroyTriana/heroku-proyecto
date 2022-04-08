import { Container } from '@chakra-ui/react'
import { Input, Spacer, Text } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
// import axios from 'axios'
import { useState, useEffect } from 'react'

export function FormDefault (props) {
  const [row, setRow] = useState([])
  const {  register } = useForm()
  // const onSubmit = async (data) => {
  //   try {
  //     const response = axios.post(`${config.URL}${props.url}`, data)

  //     return (response)
  //   } catch (error) {
  //     return error
  //   }
  // }
  useEffect(() => {
    setRow(props.rows)
  }, [])

  return (
    <Container>
      <Text h2>{props.titulo}</Text>
      <Spacer y ={1.5}/>
      <form >
        {row.map((rows) => (
          <div key={rows}>
            <Input width="80%" clearable underlined labelPlaceholder={rows} {...register(`${rows}`)}/>
            <Spacer y={1.2}/>
          </div>
        ))}
        <button type='submit'>Registrar</button>
      </form>
    </Container>
  )
}
