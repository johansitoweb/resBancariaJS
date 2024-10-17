const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectarme a la de¡b de Mongo atlas
        this.conectarDB();


        //Middlewares
        this.middlewares();
        //rutas de mi app
        this.routes();
    }

    async conectarDB()
    {
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Parseo y lectura del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }
    listen()
    {
        this.app.listen(this.port, ()=>{
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }


}

module.exports = Server;