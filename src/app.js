//Importamos el modulo y productManager.js
const express = require("express");
const exphbs = require("express-handlebars");

//Ser crea la app para el servidor y el puerto de escucha
const app = express();
const PUERTO = 8080;
const productRouter = require("./routes/products.router");
const cartRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");

//carpeta public
app.use(express.static("./src/public"));

//Motor de plantillas (configuracion) esto se hace siempre cuando se usara motor de plantillas
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Para que acepte datos complejos
app.use(express.urlencoded({extended:true}));
//Declaro que utilizare JSON para mis datos
app.use(express.json());

//Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/plantilla", viewsRouter);


//Coloco siempre el listen al final
app.listen(PUERTO, () =>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})

