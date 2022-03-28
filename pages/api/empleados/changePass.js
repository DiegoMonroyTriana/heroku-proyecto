import { pool } from '../../../config/db'
import bcrypt from 'bcryptjs'

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}
export default async function changePass (req, res) {
  try {
    const { password, id } = req.body
    const hashPass = await encryptPassword(password)
    const result = await pool.query(`UPDATE empleado SET password = '${hashPass}' WHERE id=${id}`)
    return res.status(201).json(result)
  } catch (error) {
    return res.status(400).json(error)
  }
}
