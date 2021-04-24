//Dos formas para poder utilizar dotenv
require('dotenv').config();

const express = require('express');
//Importar un módelo de base de datos
const {AccountTypes,clients} = require('./models');

const app = express();
app.set('view engine', 'ejs');
//CRUD -> Create, Read, Update y Delete
//Para poder leer los datos que envía el cliente con el formato URL Encoded
app.use(express.urlencoded({extended: false}))


app.get("/", (req, res) => {
    res.send("Servidor Academlo");
});

//Read
app.get("/clientes", async (req, res) => {
  let results = await clients.findAll({ raw: true });
  console.log(results)
  res.send(JSON.stringify(results));
});



//Create
app.post("/clientes", async (req, res) => {
    //sacar los datos que me está enviando el cliente
    const {name, description, created_at, update_at} = req.body; //desestructuración
    try{
        //Creamos un registro en la tabla account_types
        let results = await clients.create({first_name, description,last_name,email,telephone});
        //Enviamos un respuesta satisfactoria
        res.send("Se ha agregado un cliente Nuevo");
    }catch(error){
        console.log(error);
        res.status(400).send("No se ha podido agregar el tipo de cuenta");
    }
});


const PORT = process.env.PORT || 8080;

//Create server
app.listen(PORT, () => {
    console.log("Servidor escuchando sobre el puerto", PORT);
});