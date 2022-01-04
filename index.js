const LISTA_PREGUNTAS = require("./lista_preguntas.json");
const readline = require("readline");
const User = require("./User");
const Trivia = require("./Trivia");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "-------------------\nCual es tu nombre?\n-------------------\n",
  (name) => {
    const user = new User(name);
    Trivia.user = user;
    Trivia.listaPreguntas = LISTA_PREGUNTAS;
    Trivia.rl = rl;
    Trivia.accionInicio();
  }
);

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

//Trivia.accionInicio();
