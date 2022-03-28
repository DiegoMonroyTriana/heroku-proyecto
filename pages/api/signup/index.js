import { pool } from '../../../config/db'
import bcrypt from 'bcryptjs'

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}
const checkDuplicated = async (mail) => {
  try {
    const [email] = await pool.query('SELECT * FROM empleado WHERE email = ?', [mail])
    if (email.length >= 1) {
      return false
    }
    return true
  } catch (error) {
    console.log(error)
  }
}

export default async function handler (req, res) {
  try { 
  const { nombre, apellido_paterno, apellido_materno, email, password, numero_empleado, puesto, rol } = req.body
  const validate = await checkDuplicated(email)
  if (!validate) {
    return res.status(402).json('El correo ya existe')
  } else {
    const hashPass = await encryptPassword(password)
    const [result] = await pool.query('INSERT INTO empleado SET ?', {
      nombre,
      apellido_paterno,
      apellido_materno,
      puesto,
      rol,
      numero_empleado,
      email,
      password: hashPass
    })
    return res.status(202).json(result)
  }} catch (error) {
    return res.status(400).json(error)
  }
}
