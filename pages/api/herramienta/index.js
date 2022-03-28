import { pool } from '../../../config/db'

const verHerramienta = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM herramienta')
    return res.status(201).json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const crearHerramienta = async (req, res) => {
  try {
    const { nombre, marca, codigo, cantidad, portador } = req.body
    const [result] = await pool.query('INSERT INTO herramienta SET ?', { nombre, marca, codigo, cantidad, portador })
    return res.status(201).json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default async function herramienta (req, res) {
  switch (req.method) {
    case 'GET':
      verHerramienta(req, res)
      break
    case 'POST':
      crearHerramienta(req, res)
      break
  }
}
