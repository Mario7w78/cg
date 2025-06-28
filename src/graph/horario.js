export class estudiante {
  constructor(nombre) {
    this.nombre = nombre;
    this.cursos = [];
  }

  asignarCurso(curso) {
    if (this.cursos.find(c => c.nombre === curso.nombre)) return;
  
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const franjas = Array.from({ length: 12 }, (_, i) => i);
  
    const sesiones = [];
  
    while (sesiones.length < 1) {
      const dia = dias[Math.floor(Math.random() * dias.length)];
      const inicio = franjas[Math.floor(Math.random() * 9 + 2)];
  
      let yaOcupado = false;
  
      for (let c of this.cursos) {
        for (let s of c.sesiones) {
          if ((s.dia === dia && (s.inicio === inicio || s.inicio + 1 === inicio))) {
            yaOcupado = true;
          }
        }
      }
  
      if (!yaOcupado) {
        sesiones.push({ dia, inicio });
      }
    }
  
    curso.sesiones = sesiones;
    this.cursos.push(curso);
  }
  
  
}

class curso {
  constructor(nombre, color = 0) {
    this.nombre = nombre;
    this.color = color;
    this.sesiones = []; // [{ dia: 'Lunes', inicio: 3 }]
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
    this.listaCursos = [
      "SIMULACIÓN",
      "GESTIÓN DE OPERACIONES",
      "PROGRAMACIÓN WEB",
      "ESTRUCTURA DE DATOS II",
      "INGENIERÍA DE SOFTWARE I",
      "MACHINE LEARNING",
      "ANÁLISIS Y DISEÑO DE ALGORITMOS",
      "HCI",
      "CALCULO 100",
      "DESARROLLO PERSONAL"
    ];

    this.cursos = Array.from(
      { length: numVertices },
      (_, i) => new curso(this.listaCursos[i], 0)
    );

    this.listaEstudiante = [];
  }

  asignarCursos(estudiantes) {
    estudiantes.forEach((est) => {
      const cursosEst = est.cursos;
      for (let i = 0; i < cursosEst.length; i++) {
        for (let j = i + 1; j < cursosEst.length; j++) {
          const index1 = this.cursos.indexOf(cursosEst[i]);
          const index2 = this.cursos.indexOf(cursosEst[j]);
          if (index1 !== -1 && index2 !== -1) {
            this.h[index1][index2] = 1;
            this.h[index2][index1] = 1;
          }
        }
      }
    });
  }

  guardarEstudiante(nombre) {
    this.listaEstudiante.push(new estudiante(nombre));
  }

  get getHorario() {
    return this.h;
  }

  get getCursos() {
    return this.cursos;
  }

  coloracion() {
    for (let i = 0; i < this.h.length; i++) {
      const coloresUsados = new Set();
      for (let j = 0; j < this.h.length; j++) {
        if (this.h[i][j] === 1 && this.cursos[j].getColor !== 0) {
          coloresUsados.add(this.cursos[j].getColor);
        }
      }
      let color = 1;
      while (coloresUsados.has(color)) {
        color++;
      }
      this.cursos[i].setColor = color;
    }
    console.log(this.cursos);
  }
}
