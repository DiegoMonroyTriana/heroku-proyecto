import { pool } from '../../../config/db'

const verMateriales = async (req,res) => {
  try{
    const [result] = await pool.query('SELECT * FROM materiales')
    return res.status(201).json(result)
  } catch ( error ) {
    return res.status(400).json(error)
  }
}
const agregarMateriales = async (req,res) => {
  try{
    const [result] = await pool.query('INSERT INTO materiales SET ?', req.body)
    return res.status(200).json(result)
  }catch(error){
    return  res.status(500).json(error)
  }
}
export default async function material ( req, res) {
  switch (req.method){
    case 'GET' : 
      return verMateriales(req,res)
    case 'POST': 
      return agregarMateriales(req,res)
    default: 
      break 
  }
}