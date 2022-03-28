import { pool } from '../../../config/db'

const verHerramienta = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM herramienta WHERE id = ?', req.query)
    return res.status(201).json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const editarHerramienta = async (req, res) => {
  try {
    const { nombre, marca, codigo, cantidad, portador } = req.body
    const id = req.query
    const [result] = await pool.query('UPDATE herramienta SET nombre = ?, marca = ?, codigo = ?, cantidad = ?, portador = ? WHERE id = ?', { nombre, marca, codigo, cantidad, portador, id })
    return res.status(201).json(result)
  } catch (error) {
    return res.status(201).json(error)
  }
}
const eliminarHerramienta = async (req, res) => {
  try {
    const id = req.query
    await pool.query('DELETE FROM herramienta WHERE id = ?', id.id)
    return res.status(201).json('Eliminado')
  } catch (error) {
    return res.status(500).json(error)
  }
}
export default async function idProyecto (req, res) {
  switch (req.method) {
    case 'GET': verHerramienta(req, res)
      break
    case 'PUT': editarHerramienta(req, res)
      break
    case 'DELETE': eliminarHerramienta(req, res)
      break
  }
}
