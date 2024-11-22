const express = require('express')
const cors = require("cors");

class server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.userRoutesPath = "/api/user"
        
        //Middlewares
        this.middlewares();

        //Rutas de mi Aplicacion
        this.routes();
    }

    middlewares(){
        //Configuraion basica CORS
        this.app.use(cors());

        //Parse y lecutra del Body
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
       this.app.use(this.userRoutesPath, require("../routes/user.routes"));
    }

    start (){
        this.app.listen(this.port, () =>{
            console.log("Escuchando en el puerto", this.port);
        });
    }
}

module.exports = server