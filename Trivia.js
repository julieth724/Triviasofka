class Trivia {
  static user;
  static listaPreguntas = [];
  static pocisionActual = 0;
  static puntos = 0;
  static rl;

  static desordenarPreguntas() {
    this.listaPreguntas.sort(() => Math.random() - 0.5);
    this.rl.write(`------------------------------------ \n`);
    this.rl.write(`Hola ${this.user.name} vamos a jugar \n`);
    this.rl.write(`------------------------------------ \n`);
    this.pintarPreguntaActual();
  }
  static pintarPreguntaActual() {
    const preguntaActual = this.listaPreguntas[this.pocisionActual];
    this.rl.write(`${preguntaActual.Pregunta}\n`);
    this.pintarRespuestas(preguntaActual.respuesta);
  }
  static pintarRespuestas(listaRespuestas) {
    const respuestasdesordenadas = [...listaRespuestas];
    respuestasdesordenadas.sort(() => Math.random() - 0.5);
    respuestasdesordenadas.forEach((item, i) => {
      this.rl.write(`${i + 1}. ${item} \n`);
    });
    this.escogerRespuesta(respuestasdesordenadas);
  }
  static final() {
    this.rl.write("gracias por jugar \n");
    this.rl.close();
  }
  static correcta() {
    ++this.puntos;
    this.rl.write(`-------------------------------------------------- \n`);
    this.rl.write(`Correcto tu puntuación actual es de ${this.puntos} \n`);
    this.rl.write(`-------------------------------------------------- \n`);
  }
  static mal() {
    this.rl.write(`-------------------------------------------------- \n`);
    this.rl.write(`Lo sentimos tu puntuación actual es de ${this.puntos} \n`);
    this.rl.write(`-------------------------------------------------- \n`);
  }

  static escogerRespuesta(posiblesRespuestas) {
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
