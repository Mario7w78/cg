import { useState, useEffect } from "react";
import { Matriz } from "./components/matriz";
import { Grafo } from "./components/grafo";
import { Horario, estudiante } from "./graph/horario";
import { Horarios } from "./components/horarios";

function App() {
  const [cantidad, setCantidad] = useState(1);
  const [grafo, setGrafo] = useState(null);
  const [cursos, setCursos] = useState([]);

  const [listaEstudiantes, setListaEstudiantes] = useState([]);
  const [nuevoEstudiante, setNuevoEstudiante] = useState("");
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  useEffect(() => {
    if (cantidad > 0 && cantidad < 12) {
      const h = new Horario(cantidad);
      setGrafo(h);
      setCursos([]);
    }
  }, [cantidad]);

  const iniciarColoracion = () => {
    grafo.coloracion();
    setCursos(grafo.getCursos);
  };

  const agregarEstudiante = (e) => {
    e.preventDefault();
    const yaExiste = listaEstudiantes.some(
      (e) => e.nombre.toLowerCase() === nuevoEstudiante.toLowerCase()
    );
    if (!yaExiste) {
      const nuevo = new estudiante(nuevoEstudiante);
      setListaEstudiantes([...listaEstudiantes, nuevo]);
    }

    setNuevoEstudiante("");
  };

  const asignarCurso = () => {
    const index = listaEstudiantes.findIndex(
      (e) => e.nombre == estudianteSeleccionado
    );
    const estudiante = listaEstudiantes[index];
    const curso = grafo.getCursos.find((c) => c.getCurso == cursoSeleccionado);

    estudiante.asignarCurso(curso);
    grafo.asignarCursos(listaEstudiantes);
    setCursos([...grafo.getCursos]);
  };

  const probarEjemplo = () => {
    if (!grafo) return;

    const mario = new estudiante("Mario");
    const neil = new estudiante("Neil");

    mario.asignarCurso(grafo.getCursos[0]);
    mario.asignarCurso(grafo.getCursos[2]);
    mario.asignarCurso(grafo.getCursos[4]);
    mario.asignarCurso(grafo.getCursos[3]);
    mario.asignarCurso(grafo.getCursos[9]);
    mario.asignarCurso(grafo.getCursos[7]);
    mario.asignarCurso(grafo.getCursos[6]);

    neil.asignarCurso(grafo.getCursos[2]);
    neil.asignarCurso(grafo.getCursos[3]);
    neil.asignarCurso(grafo.getCursos[4]);
    neil.asignarCurso(grafo.getCursos[5]);
    neil.asignarCurso(grafo.getCursos[9]);
    neil.asignarCurso(grafo.getCursos[8]);
    neil.asignarCurso(grafo.getCursos[6]);
    neil.asignarCurso(grafo.getCursos[1]);

    const nuevosEstudiantes = [mario, neil];

    // Asignar conflictos
    grafo.asignarCursos(nuevosEstudiantes);

    // Aplicar coloración
    grafo.coloracion();

    // Actualizar estado
    setListaEstudiantes(nuevosEstudiantes);
    setCursos([...grafo.getCursos]);
  };

  return (
    <>
      <h1 className="mb-6 font-bold text-3xl text-center text-white py-4 bg-orange-400">
        Coloración de Grafos
      </h1>

      <div className="flex justify-center gap-12 mb-10">
        <div className="flex flex-col">
          <div className="flex gap-2.5 py-2 border-b-2 mb-3">
            <label htmlFor="cantidadCursos">
              Ingrese la Cantidad de Cursos
            </label>
            <input
              name="cantidadCursos"
              type="number"
              min={1}
              max={10}
              onChange={(e) => setCantidad(parseInt(e.target.value))}
              className="border p-1 w-[10%] text-center"
            />
          </div>

          {grafo && (
            <>
              <form className="flex gap-4 py-3 ">
                <label className="py-2" htmlFor="nombreEst">
                  Agregar Estudiante:
                </label>
                <input
                  required
                  onChange={(e) => setNuevoEstudiante(e.target.value)}
                  name="nombreEst"
                  type="text"
                  className="border text-center"
                />
                <button
                  className="bg-sky-400 p-2 cursor-pointer font-bold text-white"
                  onClick={agregarEstudiante}
                >
                  Guardar
                </button>
              </form>
              <form className="flex mb-4 border-b-2 pb-3">
                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => setEstudianteSeleccionado(e.target.value)}
                    name="listaAlumnos"
                    className="p-3 bg-orange-200 text-center"
                  >
                    <option value="">Selecciona un estudiante</option>
                    {listaEstudiantes.map((estudiante) => (
                      <option key={estudiante.nombre} value={estudiante.nombre}>
                        {estudiante.nombre}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="cursos">Matricular a </label>

                  <select
                    onChange={(e) => setCursoSeleccionado(e.target.value)}
                    name="cursos"
                    className="p-3 bg-orange-200 text-center"
                  >
                    <option value="">Selecciona un curso</option>
                    {grafo.cursos.map((curso) => (
                      <option key={curso.nombre} value={curso.nombre}>
                        {curso.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="bg-red-400 p-2 font-bold cursor-pointer text-white "
                  onClick={(e) => {
                    e.preventDefault();
                    asignarCurso();
                    setListaEstudiantes([...listaEstudiantes]);
                  }}
                >
                  Matricular
                </button>
              </form>
            </>
          )}
          {cantidad && (
            <>

              <button
                className="p-1 hover:cursor-pointer bg-sky-400 mb-4 font-bold text-white rounded-2xl"
                onClick={iniciarColoracion}
              >
                Iniciar Coloracion de grafos
              </button>
              <button
                className="p-1 hover:cursor-pointer bg-red-400 font-bold text-white rounded-2xl"
                onClick={probarEjemplo}
              >
                Probar Ejemplo
              </button>
            </>
          )}
        </div>

        <div className="">
          {grafo && grafo.getHorario && (
            <>
              <Grafo
                horario={grafo.getHorario}
                cursos={cursos}
                nombres={grafo.cursos}
              />
            </>
          )}
        </div>
      </div>

      {grafo && grafo.cursos[0].color && (
        <div className="w-full flex flex-col items-center my">
          <Matriz horario={grafo.getHorario} nombres={grafo.cursos} />
          <Horarios listaEstudiantes={listaEstudiantes} />
        </div>
      )}
    </>
  );
}

export default App;
