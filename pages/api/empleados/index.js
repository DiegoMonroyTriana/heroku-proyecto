import { pool } from '../../../config/db'

export default async function handler (req, res) {
  try {
    const { method } = req

      switch (method) {
        case 'GET': {
          const [result] = await pool.query('SELECT nombre, apellido_paterno, apellido_materno, id, numero_empleado, puesto, rol, email FROM empleado')
          return res.status(202).json(result)
        }
        case 'POST': {
          const [result] = await pool.query('SELECT * FROM empleado')
          return res.status(202).json(result)
        }
        default:
          return res.status(400).json('Method not allowed')
      }
   
   
  } catch (error) {
    return res.json(error)
  }
}
