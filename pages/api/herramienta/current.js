import { pool } from '../../../config/db'

export default async function herramientaAsignada (req, res) {
  try {
    const { portador } = req.body
    const [result] = await pool.query('SELECT * FROM herramienta WHERE portador = ?', portador)
    return res.status(201).json(result)
  } catch (error) {
    return res.status(400).json(error)
  }
}
