import { pool } from '../../../config/db'

const crearProyecto = async (req, res) => {
  try {
    const { nombre, fecha_inicio, fecha_fin, descripcion, materiales, trabajadores, creador_id } = req.body
    const [result] = await pool.query('INSERT INTO proyecto SET ?', { nombre, materiales, descripcion, trabajadores, fecha_inicio, fecha_fin, creador_id })
    return res.status(202).json(result)
  } catch (error) {
    return res.status(505).json(error)
  }
}

const verProyectos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM proyecto')
    return res.status(202).json(result)
  } catch (error) {
    return res.status(505).json(error)
  }
}

export default async function proyectos (req, res) {
  switch (req.method) {
    case 'GET':
      verProyectos(req, res)
      break
    case 'POST':
      crearProyecto(req, res)
      break
  }
}
