import { pool } from '../../../config/db'

export default async function handler (req, res) {
  const { method, query, body } = req
  switch (method) {
    case 'GET':{
      const [result] = await pool.query('SELECT * FROM proyecto WHERE id = ?', query.id)
      return res.status(202).json(result)
    }
    case 'POST': {
      const [result] = await pool.query(`UPDATE proyecto SET id = ?, nombre = ?, materiales = ?, descripcion = ?, trabajadores = ?, fecha_inicio = ?, fecha_fin = ?, creador_id ?, WHERE id = ${query.id}`, {body})
      return res.status(201).json(result)
    }
    default :
      return res.status(400).json('Method not allowed')
  }
}
