const express = require("express");

const app = express();

app.use(express.json());

let numeros = [];

app.get("/", (req, res) => {
  res.send("este es mi root");
});

app.get("/currentDate", (req, res) => {
  const currentDate = new Date();

  res.send(
    String(currentDate.getDate()) +
      "-" +
      String(currentDate.getMonth()) +
      "-" +
      String(currentDate.getFullYear())
  );
});

app.get("/greet", (req, res) => {
  res.send("Hello World");
});

/*
 GET /greet/María -> return "Hello María"
 */

app.get("/greet/:name", (req, res) => {
  res.send("Hello " + req.params.name);
});

/*
1 - GET /checkEvenNumber/3 -> return code 400 Si no es par y 200 si es par
2 - En la ruta anterior devuelve 400 (bad request) si el input no es número
*/

app.get("/checkEvenNumber/:number", (req, res) => {
  if (req.params.number % 2 === 0) {
    res.status(200).send();
  } else if (req.params.number !== 0) {
    res.status(400).send();
  } else if (req.params.number === NaN) {
    res.status(400).send();
  }
});

/*
GET /add/2/7 -> return la suma de 2+7 (9)
*/

app.get("/add/:suma1/:suma2", (req, res) => {
  const suma = parseInt(req.params.suma1) + parseInt(req.params.suma2);
  res.send("este es el resultado de " + suma);
});

/*
POST /number/1 -> Guarda un numero en un array declarado en el scope global con cada request y return todos los números guardados.
   - POST /number/1 -> [1]
   - POST /number/2 -> [1,2]
   - POST /number/5 -> [1,2,5]
*/

app.post("/numeros/:number", (req, res) => {
  numeros.push(req.params.number);

  res.send(numeros);
});

/*
DELETE /number/1 -> ahora elimina un número de un array y devuelve todos
   - DELETE /number/1 -> [2,5]
   - DELETE /number/2 → [5]
*/

app.delete("/numeros/:number", (req, res) => {
  const index = numeros.indexOf(req.params.number);
  if (index > -1) {
    numeros.splice(index, 1);
  }

  res.send(numeros);
});

app.put("/numeros/:number1/:number2", (req, res) => {
  const number1 = req.params.number1;
  const number2 = req.params.number2;

  const index1 = numeros.indexOf(number1);

  if (index1 !== -1) {
    numeros[index1] = number2;
  }

  res.send(numeros);
});

/*
POST /countFields => Cuenta el numero de campos de un objeto JSON enviado por req.body
   - POST /countFields BODY {“a”:1,”b”:2,”c”:3} -> 3
   - POST /countFields BODY {“a”:1,”b”:2,”c”:3,”d”:5} -> 4
*/

app.post("/countFields", (req, res) => {
  const obj = req.body;
  let count = Object.keys(obj).length;

  console.log(count);
});

/*
1. POST /createUser => Acepta un objeto JSON en el cuerpo del request, por ejemplo: {"name": "John", "email": "[john@example.com](mailto:john@example.com)"}). Almacena el usuario en una lista de usuarios y devuelve el usuario recién. Añade desde el servidor un id cada usuario en el momento de crearlos.
*/
app.post("/createUser", (req, res) => {
  let users = [];
});
app.listen(4001, () => console.log("Server on..."));
