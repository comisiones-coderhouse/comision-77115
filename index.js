import connectDB from "./db.js";
import app from "./app.js";
import prettyBytes from "pretty-bytes";
//require('dotenv').config()

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

console.log(`Conectando a DB....`);

//global : es el objeto global
//console.log(global);

//console.dir(process, { depth: 0 });

const arquitectura_del_so = process.arch; //arch
const el_os = process.platform;
const el_id_del_proceso = process.pid;
const la_memoria_del_entorno = process.memoryUsage();

const heapTotal = prettyBytes(la_memoria_del_entorno.heapTotal);
const heapUsed = prettyBytes(la_memoria_del_entorno.heapUsed);

//console.log(`Heap Total: ${heapTotal}`);
//console.log(`Heap Used: ${heapUsed}`);
//console.log(process.argv);
//console.log(process.env.PORT);

//process.stdout.write("Hola Mundo");

//nodo.addEventListener("evento",callback)

//nodo.addListener("evento",callback)
//nodo.on("evento",callback)
/* process.stdin.on("data", (data) => {
  const input = data.toString();
  console.log("La terminal dice : ", input);
}); */

/* stdout: [Getter],
  stdin: [Getter],
  */

connectDB(() => {
  app.listen(PORT, () => {
    console.log(`Servidor Web corriendo en puero ${PORT}!`);
  });
});
