const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./routes");//modulo que contiene las rutas y los controladores
const cors = require('cors');
const { ACCES_CONTROL_URL } = process.env;
//servidor de Node.js utilizando como framework Express para crear una api web

const server = express(); // utilizamos express para simplificar la creación de servidores y manejo de rutas
server.use(cors());//middleware para que el servidor responda a solicitudes desde diferentes orígenes
server.use(morgan("dev")); //middleware para el registro de solicitudes HTTP 
server.use(express.json());//middleware permite a Express interpretar las solicitudes entrantes con formato JSON y transformarlas en objetos JavaScript.
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

server.use(mainRouter);//se monta el enrutador, las rutas y controladores de mainRouter estaran disponibles en el servidor

module.exports = server;


