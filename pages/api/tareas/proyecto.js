import {pool} from '../../../config/db'

export default async function proyecto (req,res) {
  try {
    const data = req.body
    const [result] = await pool.query(`SELECT * FROM tarea WHERE id_proyecto = ?`, data.data)
    res.status(200).json(result)
  }catch (error){
    res.status(400).json(error)
  }

}