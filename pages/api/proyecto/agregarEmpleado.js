import { pool } from '../../../config/db'

export default async function handler (req,res) {
  try{
    const {id, trabajadores} = req.body 
    const response = await pool.query(`UPDATE proyecto SET trabajadores = '${trabajadores}' WHERE id = ${id}`)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json(error)
  }
}