import config from './config'
import jwt from 'jsonwebtoken'

export default function verify (req, res) {
  try {
    let token
    const tokenAuth = req.headers['x-access-token']
    if (!tokenAuth) return res.status(403).json({ message: 'No token' })
    if (tokenAuth.toLowerCase().startsWith('bearer')) {
      token = tokenAuth.substring(7)
    } else {
      return res.status(403).json({ message: 'token invalid' })
    }
    const decoded = jwt.verify(token, config.SECRET)
    return res.status(202).json(decoded)
  } catch (error) {
    return res.status(401).json({ message: 'No autorizado' })
  }
}
