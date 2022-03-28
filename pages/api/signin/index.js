import bcrypt from 'bcryptjs'
import { pool } from '../../../config/db'
import jwt from 'jsonwebtoken'
import config from '../config'

const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default async function handler (req, res) {
  try {
    const { email, password } = req.body
    const [empleadoEncontrado] = await pool.query('SELECT * FROM empleado WHERE email = ?', [email])
    const length = empleadoEncontrado.length
    if (length < 1) { return res.status(401).json('Datos incorrectos') }
    const user = Object.assign(empleadoEncontrado[0])
    const matchPass = await comparePassword(password, user.password)
    if (!matchPass) { return res.status(401).json('Datos incorrectos') }
    const token = jwt.sign({ id: user.id }, config.SECRET, { expiresIn: 86400 })
    return res.status(202).json({ token })
  } catch (error) {
    res.status(500).json(error)
  }
}
