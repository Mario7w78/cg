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

  const handleSeleccion = (e) => {
    const id = e.target.value;
    const estudiante = listaEstudiantes.find((est) => est.nombre === id);
    setEstudianteSeleccionado(estudiante);
  };

  return (
    <div className="p-4">
      <select
        name="listaEstudiantes"
        onChange={handleSeleccion}
        className="mb-4 border p-1"
      >
        <option value="">Seleccionar un estudiante</option>
        {listaEstudiantes.map((est, idx) => (
          <option key={idx} value={est.nombre}>
            {est.nombre}
          </option>
        ))}
      </select>

      <table className="w-[80vw] border border-gray-400 border-collapse text-sm ">
        <thead>
          <tr>
            <th className="border px-2 py-1">Hora / Día</th>
            {dias.map((dia, idx) => (
              <th key={idx} className="border px-2 py-1 ">
                {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center ">
          {franjas.map((franja, fIdx) => (
            <tr key={fIdx}>
              <td className="border px-2 py-1 font-medium">{franja}</td>
              {dias.map((dia, dIdx) => {
                const curso = estudianteSeleccionado?.cursos?.find((c) =>
                  c.sesiones.some((s) => s.dia === dia && s.inicio === fIdx)
                );

                const esFranjaOcupada = estudianteSeleccionado?.cursos?.some(
                  (c) =>
                    c.sesiones.some(
                      (s) => s.dia === dia && s.inicio + 1 === fIdx
                    )
                );

                if (curso) {
                  return (
                    <td
                      key={`${fIdx}-${dIdx}`}
                      rowSpan={2}
                      className="border text-white border-black font-bold"
                      style={{
                        backgroundColor: colores[curso.color - 1],
                      }}
                    >
                      {curso.nombre}
                    </td>
                  );
                }

                if (esFranjaOcupada) {
                  return null;
                }

                return <td key={`${fIdx}-${dIdx}`} className="border-1"></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
