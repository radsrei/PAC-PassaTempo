import { Voluntario } from "../models/voluntario_model.js";

const voluntario = {};

//GET
voluntario.getVoluntario = async(req,res) => {
    try {
        
        const voluntario = await voluntario.findAll()
        res.send(voluntario) 

    } catch (error) {
        console.log(error)
    }
}

export { voluntario };


// import { Voluntario } from "../models/voluntario_model.js";

// const voluntario = {}

// voluntario.getVoluntario = async(req,res)=>{
//     try {
//        const consulta = await voluntario.findAll()
//        res.send(voluntario) 
//     } catch (error) {
//         console.log(error)
//     }
// }


// export {voluntario}