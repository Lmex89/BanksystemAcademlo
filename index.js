//Dos formas para poder utilizar dotenv
require('dotenv').config();

const express = require('express');
//Importar un módelo de base de datos
const {AccountTypes,clients,accounts} = require('./models');

const app = express();
app.set('view engine', 'ejs');
//CRUD -> Create, Read, Update y Delete
//Para poder leer los datos que envía el cliente con el formato URL Encoded
app.use(express.urlencoded({extended: false}))


app.get("/", (req, res) => {
    res.send("Servidor Academlo");
});

//Read
app.get("/clientes/get/", async (req, res) => {
  let results = await clients.findAll({ raw: true });
  console.log(results)
  res.send(JSON.stringify(results));
});

app.put("/clientes/update/:id", async (req, res) => {
    try {
        const { first_name, description, last_name, email, telephone } = req.body;
        let results = await clients.findByPk(req.params.id);
        if (results) {
            results.first_name = first_name
            results.description = description;
            results.last_name = last_name;
            results.email = email;
            results.telephone = telephone;
            results.save();
            res.send(results)
        }

        else {
            res.send(
                {
                    msg: "No existe ese id de cliente",
                    sucess: false,
                    results,
                }
            )
        }
        
    }
    catch(error){
        console.log(error);
        res.status(400).send("No se ha podido agregar el tipo de cuenta");
    }
    
})

//Create
app.post("/clientes/post/", async (req, res) => {
    //sacar los datos que me está enviando el cliente
    const { first_name, description, last_name, email, telephone } = req.body; //desestructuración
    try{
        //Creamos un registro en la tabla account_types
        let results = await clients.create({first_name, description,last_name,email,telephone});
        //Enviamos un respuesta satisfactoria
        res.send({
            msg: "Se ha agregado un cliente Nuevo",
            sucess: true,
            results,
        });
    }catch(error){
        console.log(error);
        res.status(400).send("No se ha podido agregar el tipo de cuenta");
    }
});


app.delete("/clientes/delete/:id", async (req, res) => {

    id = req.params.id;
    try {
        let client_to_delete = await clients.findByPk(req.params.id);
        if (client_to_delete) {
            const response = await client_to_delete.destroy();
            res.send(response,client_to_delete)
        }
        else {
            res.send(
                {
                    msg: "No existe ese id de cliente o ya ha sido eliminado",
                    sucess: false,
                   id,
                }
            )
        }
        
    }
    catch(error){
        console.log(error);
        res.status(400).send("No se ha podido agregar el tipo de cuenta");
    }
    
})


//Read
app.get("/accounts/get/", async (req, res) => {
  let results = await accounts.findAll({ raw: true });
  console.log(results)
  res.send(JSON.stringify(results));
});


app.post("/accounts/post/", async (req, res) => {
    //sacar los datos que me está enviando el cliente
    const { account_no, client_id, balance, type } = req.body; //desestructuración
    try{
        //Creamos un registro en la tabla account_types
        let results = await accounts.create({account_no, client_id, balance, type});
        //Enviamos un respuesta satisfactoria
        res.send({
            msg: "Se ha agregado una Cuenta  Nueva",
            sucess: true,
            results,
        });
    }catch(error){
        console.log(error);
        res.status(400).send("No se ha podido agregar el tipo de cuenta");
    }
});


app.put("/accounts/update/:id", async (req, res) => {
    try {
        const { account_no, client_id, balance, type } = req.body; //desestructuración
        let results = await accounts.findByPk(req.params.id);
        if (results) {
            results.account_no = account_no
            results.client_id = client_id;
            results.balance = balance;
            results.type = type;
            results.created_at = Date.now()
            results.updated_at = Date.now()
            results.save();
            res.send(results)
        }
        else {
            res.send(
                {
                    msg: "No existe ese id de cuenta",
                    sucess: false,
                    results,
                }
            )
        }
        
    }
    catch(error){
        console.log(error);
        res.status(400).send("No se ha podido agregar el tipo de cuenta");
    }
    
})

app.delete("/accounts/delete/:id", async (req, res) => {
    _id = req.params.id
    try {
        let results = await accounts.findByPk(req.params.id);
        if (results) {
            const response = await results.destroy();
            res.send({
                msg: "La concuenta ha sido eliminada de manera exitosa",
                sucess: true,
                results,
                response,
            })
        }
        else {
            res.send(
                {
                    msg: "No existe ese id de cuenta",
                    sucess: false,
                    _id,
                }
            )
        }
        
    }
    catch(error){
        console.log(error);
        res.status(400).send("No se ha podido agregar el tipo de cuenta");
    }
    
})

const PORT = process.env.PORT || 8080;

//Create server
app.listen(PORT, () => {
    console.log("Servidor escuchando sobre el puerto", PORT);
});