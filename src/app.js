//Importamos el modulo y productManager.js
const express = require("express");

//Ser crea la app para el servidor y el puerto de escucha
const app = express();
const PUERTO = 8080;
const productRouter = require("./routes/products.router");
const cartRouter = require("./routes/carts.router");

//Para que acepte datos complejos
app.use(express.urlencoded({extended:true}));
//Declaro que utilizare JSON para mis datos
app.use(express.json());

//Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//Coloco siempre el listen al final
app.listen(PUERTO, () =>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})

