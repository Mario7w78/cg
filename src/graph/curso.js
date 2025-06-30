export const colores = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#F97316",
    "#06B6D4",
    "#84CC16",
    "#F472B6",
    "#6366F1",
  ];

export class curso {
  constructor(nombre, color = 0) {
    this.nombre = nombre;
    this.color = color;
    this.sesiones = []; // { dia, inicio }
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