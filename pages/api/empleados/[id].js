import { pool } from '../../../config/db'

export default async function handler (req, res) {
  const { method, query } = req
  switch (method) {
    case 'GET':
      try {
        const [data] = await pool.query('SELECT nombre, apellido_paterno, apellido_materno, id, numero_empleado, puesto, rol, email FROM empleado WHERE id = ?', query.id)
        return res.status(202).json(data)
      } catch (error) {
        res.status(500).json(error)
      } break
    case 'DELETE':
      try {
        const [data] = await pool.query('DELETE FROM empleado WHERE id = ?', query.id)
        return res.status(202).json(data)
      } catch (error) {
        res.status(500).json(error)
      } break

    default:
      return res.status(400).json('Method not allowed')
  }
}
