import { pool } from "../../../config/db"

export default async function asignar (req,res){
  try {
    const {portador, id} = req.body 
    const result = await pool.query(`UPDATE herramienta SET portador = '${portador}' WHERE id = ${id}`)
    return res.status(201).json(result)
  } catch (error) {
    return res.status(401).json(error)
  }
}