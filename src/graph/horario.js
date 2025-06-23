class curso {
  constructor(nombre, color = 0) {
    this.nombre = nombre;
    this.color = color;
  }

  get getCurso() {
    return this.nombre;
  }
  get getColor() {
    return this.color;
  }
  set setColor(value) {
    this.color = value;
  }
}

export class Horario {
  constructor(numVertices) {
    this.h = Array.from({ length: numVertices }, () =>
      Array(numVertices).fill(0)
    );

    for (let i = 0; i < numVertices; i++) {
      for (let j = i + 1; j < numVertices; j++) {
        const valor = Math.floor(Math.random() * 2);
        this.h[i][j] = valor;
        this.h[j][i] = valor;
      }
    }

    this.cursos = Array.from(
      { length: numVertices },
      (_, i) => new curso(`Curso ${i}`, 0)
    );
  }

  get getHorario() {
    return this.h;
  }

  get getCursos() {
    return this.cursos;
  }

  coloracion() {
    for (let i = 0; i < this.h.length; i++) {
      
      //colores adyacentes del nodo
      const coloresUsados = new Set();

      //verificar si los vecinos tienen colores
      //si es asi se guarda en el set  
      for (let j = 0; j < this.h.length; j++) {
        if (this.h[i][j] === 1 && this.cursos[j].getColor !== 0) {
          coloresUsados.add(this.cursos[j].getColor);
        }
      }

      //agregar color
      let color = 1;
      while (coloresUsados.has(color)) {
        color++;
      }

      this.cursos[i].setColor = color;
    }
  }
}
