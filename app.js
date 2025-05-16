const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Paciente = require('./models/Paciente');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions ={
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de pacientes',
            version: '1.0.0',
            description: 'API de gestion de pacientes'
        },
        servers: [
            {
                url: 'http://localhost:4000'
            }
        ]
    },
    apis: ['./app.js']
};

const app = express();
app.use(express.json());
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const MONGO_URI = 'mongodb+srv://certus:969046056@cluster0.xvceyo2.mongodb.net/certus?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI).then(()=>{
    console.log('Conectado exitosamente');
}).catch((err)=>{
    console.log('Error encontrado', err);
});

/**
 * @swagger
 * /pacientes:
 *  post:
 *      summary: Registra un nuevo paciente
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                          apellido:
 *                              type: string
 *                          edad:
 *                              type: integer
 *                          sangre:
 *                              type: string
 *                          padecimiento:
 *                              type: string
 *                          comentarios:
 *                              type: string
 *                      required:
 *                          - nombre
 *                          - aprellido
 *                          - edad
 *                          - sangre
 *                          - padecimiento
 *      responses:
 *          200:
 *              description: Paciente ingresado correctamente
 *          400:
 *              description: Error en el registro
 */
app.post('/pacientes', async (req, res)=> {
    try{
        const nuevoPaciente = new Paciente(req.body);
        await nuevoPaciente.save();
        res.status(200).json({message:'Paciente ingresado correctamente'});
    }catch(err){
        console.log(err);
        res.status(400).json({message:'Error en el registro'});
    }
});

/**
 * @swagger
 * /pacientes:
 *  get:
 *      summary: Obtiene todos los pacientes
 *      responces:
 *          200:
 *              description: Lista de pacientes
 *          400:
 *              description: Error en el registro
 */
app.get('/pacientes', async (req, res)=> {
    try{
        const pacientes = await Paciente.find();
        res.status(200).json(pacientes);
    }catch(err){
        console.log(err);
        res.status(400).json({mensaje:'Error en lista'});
    }    
});

app.listen(4000, ()=>{
    console.log('Se está ejecutando en el puerto 4000')
});