export class estudiante {
    constructor(nombre) {
      this.nombre = nombre;
      this.cursos = [];
    }
  
    asignarCurso(curso) {
      if (this.cursos.find((c) => c.nombre === curso.nombre)) return;
      this.cursos.push(curso); 
    }
  }