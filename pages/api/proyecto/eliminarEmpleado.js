import { pool } from '../../../config/db'

export default async function handler (req,res) {
  try{
  const {id, trabajadores} = req.body
  const result = await pool.query(`UPDATE proyecto SET trabajadores = '${trabajadores}' WHERE id = ${id}`)
  return res.status(200).json(result)
}catch (error) {
  return res.status(400).json(error)
}
}