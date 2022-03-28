import {pool} from '../../../config/db'

const obtenerTareas = async(req,res) =>{
    try{
        const [result] = await pool.query('SELECT * FROM tarea')
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json(error)
    }
}
const crearTarea = async (req,res) => {
    try {
        const {id_proyecto, descripcion, trabajo, fecha, status } = req.body
        const [result] = await pool.query('INSERT INTO tarea SET ?', {id_proyecto, descripcion, trabajo, fecha, status })
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json(error)
    }
}
export default async function tareas (req,res){
    switch (req.method){
        case 'GET':
            obtenerTareas (req,res)
            break
        case 'POST':
            crearTarea (req,res)
            break
        
    }
}