const LISTA_PREGUNTAS = require("./lista_preguntas.json");
const readline = require("readline");
const Trivia = require("./Trivia");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function initGame() {
  Trivia.listaPreguntas = LISTA_PREGUNTAS;
  Trivia.rl = rl;
  Trivia.accionInicio();
}

initGame();

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

//Trivia.accionInicio();
