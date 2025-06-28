import { useState } from "react";

export const Horarios = ({ listaEstudiantes }) => {
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

  const franjas = [
    "7:00 - 8:00",
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00", // ALMUERZO
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
  ];

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  const colores = [
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6",
    "#F97316", "#06B6D4", "#84CC16", "#F472B6", "#6366F1",
  ];

  const handleSeleccion = (e) => {
    const nombre = e.target.value;
    const estudiante = listaEstudiantes.find((est) => est.nombre === nombre);
    setEstudianteSeleccionado(estudiante);
  };

  // Mapea por celda qué curso va en cada día/hora
  const obtenerCursoEnCelda = (dia, hora) => {
    if (!estudianteSeleccionado) return null;

    for (let curso of estudianteSeleccionado.cursos) {
      const sesion = curso.sesiones[0];
      if (sesion && sesion.dia === dia && sesion.inicio === hora) {
        return curso;
      }
    }
    return null;
  };

  return (
    <div className="p-4">
      <select
        name="listaEstudiantes"
        onChange={handleSeleccion}
        className="mb-4"
      >
        <option value="">Seleccionar un estudiante</option>
        {listaEstudiantes.map((est, idx) => (
          <option key={idx} value={est.nombre}>
            {est.nombre}
          </option>
        ))}
      </select>

      <table className="w-[90vw] border border-gray-400 border-collapse text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1 bg-gray-200">Hora / Día</th>
            {dias.map((dia, idx) => (
              <th key={idx} className="border px-2 py-1 bg-gray-200">
                {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {franjas.map((franjaTexto, filaIdx) => (
            <tr key={filaIdx}>
              <td className="border px-2 py-1 font-medium">{franjaTexto}</td>
              {dias.map((dia, colIdx) => {
                const curso = obtenerCursoEnCelda(dia, filaIdx);
                return (
                  <td
                    key={colIdx}
                    className="border px-2 py-1 "
                    style={{
                      backgroundColor: curso ? colores[curso.color - 1] : "transparent",
                      color: curso ? "white" : "black",
                      fontWeight: curso ? "bold" : "normal",
                    }}
                  >
                    {curso ? curso.nombre : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
