
# 💻 Guía de Uso de Plantilla para REST Server con Node.js y Express

Hola soy Brandon, esta plantilla proporciona una base sólida para desarrollar APIs REST utilizando **Node.js** y **Express**. La estructura de carpetas está diseñada para ser modular, escalable y fácil de entender, permitiendo que puedas empezar rápidamente y extenderla según tus necesidades.

{% @github-files/github-code-block url="https://github.com/Brandon-navarro-navarro/Plantilla-BackEnd-NodeJs" fullWidth="false" %}

## Estructura de Carpetas

La estructura básica del proyecto es la siguiente:

{% code fullWidth="false" %}
```bash
project/
│
├── controllers/
│   └── userController.js      # Controladores para gestionar la lógica de las rutas
│
├── models/
│   └── server.js              # Configuración del servidor y middlewares
│
├── public/                    # Archivos estáticos (como imágenes, CSS, JS)
│
├── routes/
│   └── userRoutes.js          # Rutas de la API
│
├── .env                       # Variables de entorno (configuración del puerto, etc.)
├── .gitignore                 # Archivos y carpetas que Git debe ignorar
├── app.js                     # Punto de entrada de la aplicación
├── package.json               # Dependencias y scripts del proyecto
└── README.md                  # Documentación del proyecto (esta guía)
```
{% endcode %}

### Package.json

Aquí se definen las dependencias del proyecto y los scripts para ejecutar el servidor. Un ejemplo básico de `package.json`:

```json
{
  "name": "apprestserver",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start-nodemon": "nodemon --env-file=.env app.js",
    "start": "node --env-file=.env app.js"
  },
  "author": "Brandon Navarro Navarro",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.1"
  }
}
```

### .env

Este archivo se usa para almacenar variables de entorno. En este caso, la variable `PORT` define el puerto en el que el servidor escuchará las peticiones.

```
PORT=9898
```

### app.js

Este es el archivo de arranque principal de la aplicación. Aquí, solo importas y configuras la instancia de tu servidor desde el archivo `models/server.js.`Ademas se debe ejecutar la función `start()` para que de esta forma se inicie el servidor.

```javascript
const Server = require('./models/server'); // Importa la configuración del servidor

const server = new Server();

server.start();
```

### public/

Este directorio sirve archivos estáticos como imágenes, CSS o JavaScript para el frontend. Los archivos almacenados en esta carpeta serán accesibles desde la web.

### **models/server.js**

Este archivo contiene la configuración del servidor. Aquí se inicializan los middlewares, las rutas y se configura el puerto a usar. Además, se gestiona la configuración del CORS.

Ejemplo de configuración básica en `server.js`:

```javascript
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

        //Lectura y parseo del body
        this.app.use(express.json());
        
        //Configuracion de uso de archivos estaticos
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
```



{% hint style="info" %}
Si deseas hacer una configuración más específica de CORS, puedes hacerlo pasando opciones al middleware:

```javascript
this.app.use(cors({
  origin: 'https://example.com', // Solo permite solicitudes de este dominio
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
```
{% endhint %}

### **controllers/user.controller.js**

En esta carpeta, tienes los controladores de la API. Un controlador es responsable de gestionar la lógica para manejar las solicitudes HTTP. El controlador `user.controller.js` se encargará de las operaciones para los usuarios, como crear, obtener, actualizar y eliminar usuarios.

Ejemplo de código en `user.controller.js`:

```javascript
const { response, request } = require("express");

const userGet = (req = request,res = response) => {

    const {name,id} = req.query;

    res.json({
     msg: "get API - Controller",
     name,
     id
    });
 }

 const userPost = (req = request,res = response) => {

    const {nombre, edad} = req.body;

    res.json({
     msg: "post API - Controller",
     nombre,
     edad
    });
 }

 const userPut = (req = request,res = response) =>{

    const id = req.params.id;

    res.json({
     msg: "put API - Controller",
     id
    });
 }

 const userPatch = (req,res = response) =>{
    res.json({
     msg: "patch API - Controller"
    });
 }

 const userDelete = (req,res = response) =>{
    res.json({
     msg: "delete API - Controller"
    });
 }


 module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
 }
```

### **routes/user.routes.js**

Aquí definimos las rutas para los controladores. Por ejemplo, si quieres manejar todas las solicitudes para usuarios, este archivo se encarga de definir las rutas y asociarlas con sus controladores.

Ejemplo de configuración de rutas en `user.routes.js`:

```javascript
const { Router } = require("express");
const { userGet, userPut, userPost, userPatch, userDelete } = require("../controllers/user.controller");

const router = Router();

router.get("/", userGet);

router.post("/",userPost);

router.put("/:id", userPut);

router.patch("/", userPatch);

router.delete("/", userDelete);


module.exports = router;
```

## Cómo Usar esta Plantilla

### 1. Clonar el Repositorio

Para usar esta plantilla, puedes clonar el repositorio con el siguiente comando:

```bash
git clone https://github.com/Brandon-navarro-navarro/Plantilla-BackEnd-NodeJs
```

### 2. Instalar Dependencias

Una vez clonado el proyecto, ve a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

{% hint style="warning" %}
Se esta utilizando nodemon para que cuando se realizan cambios en archivos .js se reinicie el servidor automáticamente, entonces se debe instalar nodemon de la siguiente forma:

\
Instalación Global

```bash
npm install -g nodemon
```

Instalacion en Respositorio

```bash
npm install --save-dev nodemon
```
{% endhint %}

### 3. Ejecutar el Servidor

Para arrancar el servidor, usa los siguientes comandos:

Arranque con nodemon

```bash
npm run start-nodemon
```

Arranque sin nodemon

```bash
npm start //o npm run start
```

