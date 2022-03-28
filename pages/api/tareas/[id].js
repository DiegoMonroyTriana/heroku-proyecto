import {pool} from '../../../config/db'

const obtenerTarea = async(req,res) =>{
    try {
        const {id} = req.query
        const [result] = await pool.query(`SELECT * FROM tarea WHERE id = ${id}`)
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json(error)
    }
}
const actualizarTarea = async (req,res) => {
    try {
        const {id} = req.query
        const {descripcion} = req.body
        const [result] = await pool.query(`UPDATE tarea SET descripcion = '${descripcion}' WHERE id = ${id}`)
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json(error)
    }
}
const borrarTarea  = async (req,res)=>{
    try {
        const {id} = req.query 
        const [result] = await pool.query('DELETE FROM tarea WHERE id = ?', id)
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json(error)
    }
}
export default async function tareas (req,res){
    switch (req.method){
        case 'GET':
            obtenerTarea (req,res)
            break
        case 'PUT':
            actualizarTarea (req,res)
            break
        case 'DELETE':
            borrarTarea (req,res)
            break
        
    }
}