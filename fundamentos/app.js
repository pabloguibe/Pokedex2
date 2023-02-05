const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config()
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const router = require('./router/rutasweb');

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

//Conexion a base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.spiqnsk.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))

//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');

app.use(express.static(__dirname + "/public"));

app.use('/', require('./router/rutasweb'));
app.use('/pokemon', require('./router/pokemon'));
app.use('/entrenador', require('./router/entrenador'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "ERROR 404"
    })
})

app.listen(PORT, () => {
    console.log('Servidor activo en el puerto'+PORT)
})