const User = require("./User");

class Trivia {
  constructor(listaPregunta, rl) {
    this.listaPreguntas = listaPregunta;
    this.rl = rl;
    this.currentUser;
    this.listaPreguntas = [];
    this.pocisionActual = 0;
    this.puntos = 0;
    this.ultimosResultados = [];
  }
  currentUser;
  listaPreguntas = [];
  pocisionActual = 0;
  puntos = 0;
  ultimosResultados = [];
  desordenarPreguntas() {
    this.listaPreguntas.sort(() => Math.random() - 0.5);
    this.rl.write(`------------------------------------ \n`);
    this.rl.write(`Hola ${this.currentUser.name} vamos a jugar \n`);
    this.rl.write(`------------------------------------ \n`);
    this.pintarPreguntaActual();
  }
  pintarPreguntaActual() {
    const preguntaActual = this.listaPreguntas[this.pocisionActual];
    this.rl.write(`${preguntaActual.Pregunta}\n`);
    this.pintarRespuestas(preguntaActual.respuesta);
  }
  pintarRespuestas(listaRespuestas) {
    const respuestasdesordenadas = [...listaRespuestas];
    respuestasdesordenadas.sort(() => Math.random() - 0.5);
    respuestasdesordenadas.forEach((item, i) => {
      this.rl.write(`${i + 1}. ${item} \n`);
    });
    this.escogerRespuesta(respuestasdesordenadas);
  }
  final() {
    this.ultimosResultados.push({
      name: this.currentUser.name,
      puntos: this.puntos,
    });
    this.pocisionActual = 0;
    this.puntos = 0;
    this.rl.question(
      "Precione 1 para volver a jugar 2 para terminar",
      (respuestaIni) => {
        const respuestaiInt = parseInt(respuestaIni);
        if (respuestaiInt === 1) {
          this.accionInicio();
        } else {
          this.rl.write("gracias por jugar \n");
          this.rl.close();
        }
      }
    );
  }
  correcta() {
    ++this.puntos;
    this.rl.write(`-------------------------------------------------- \n`);
    this.rl.write(`Correcto tu puntuación actual es de ${this.puntos} \n`);
    this.rl.write(`-------------------------------------------------- \n`);
  }
  mal() {
    this.rl.write(`-------------------------------------------------- \n`);
    this.rl.write(`Lo sentimos tu puntuación actual es de ${this.puntos} \n`);
    this.rl.write(`-------------------------------------------------- \n`);
  }

  accionInicio() {
    this.rl.question(
      "Escribe 1 si deseas jugar o 2 si deseas ver puntuacion \n",
      (respuestaIni) => {
        const respuestaiInt = parseInt(respuestaIni);
        if (respuestaiInt === 1) {
          this.rl.question(
            "-------------------\nCual es tu nombre?\n-------------------\n",
            (name) => {
              const user = new User(name);
              this.currentUser = user;
              this.desordenarPreguntas();
            }
          );
        } else {
          this.ultimosResultados.forEach((item) => {
            this.rl.write(`Jugador: ${item.name} resultado: ${item.puntos} \n`);
          });
          this.rl.question("Precione cualquier tecla para volver", () => {
            this.accionInicio();
          });
        }
      }
    );
  }

  escogerRespuesta(posiblesRespuestas) {
    this.rl.question(
      "Escribe solo el numero de la respuesta sin punto \n",
      (respuesta) => {
        const respuestaInt = parseInt(respuesta);
        const esCorrecta =
          posiblesRespuestas[respuestaInt - 1] ===
          this.listaPreguntas[this.pocisionActual].respuesta[0];
        const final = this.pocisionActual >= this.listaPreguntas.length - 1;
        esCorrecta ? this.correcta() : this.mal();
        if (final) {
          this.final();
        } else {
          ++this.pocisionActual;
          this.pintarPreguntaActual();
        }
      }
    );
  }
}

module.exports = Trivia;
