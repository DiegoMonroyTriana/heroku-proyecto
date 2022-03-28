import { pool } from '../../../config/db'

export default async function salida (req,res) {
  try {
    const response = await pool.query('INSERT INTO salidas SET ?', req.body)
    return res.status(200).json(response)
  }catch (error){
    return res.status(400).json(error)
  }
}