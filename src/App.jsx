import { useState, useEffect } from "react";
import { Matriz } from "./components/matriz";
import { Horario } from "./graph/horario";
import { estudiante } from "./graph/estudiante";
import { Horarios } from "./components/horarios";
import { colores } from "./graph/curso";
import { Forms } from "./components/forms";

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
    grafo.asignarSesionesPorColor();
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

    grafo.asignarCursos(nuevosEstudiantes);

    setListaEstudiantes(nuevosEstudiantes);
    setCursos([...grafo.getCursos]);
  };

  return (
    <>
      <h1 className="mb-6 font-bold text-3xl text-center text-white py-4 bg-orange-400">
        Coloración de Grafos
      </h1>

      <Forms
        cantidad={cantidad}
        agregarEstudiante={agregarEstudiante}
        listaEstudiantes={listaEstudiantes}
        grafo={grafo}
        iniciarColoracion={iniciarColoracion}
        probarEjemplo={probarEjemplo}
        setCantidad={setCantidad}
        setNuevoEstudiante = {setNuevoEstudiante}
        setListaEstudiantes={setListaEstudiantes}
        cursos={cursos}
      />

      {grafo && grafo.cursos[0].color && (
        <div className="w-full flex flex-col items-center my">
          <div className="flex gap-4">
            <Matriz horario={grafo.getHorario} nombres={grafo.cursos} />
            <ul>
              {listaEstudiantes?.map((est) => (
                <li>
                  {est.nombre}
                  <ul className="list-disc">
                    {est.cursos.map((curso) => (
                      <li
                        className="text-[9px] font-bold ml-4"
                        style={{ color: colores[curso.color - 1] }}
                      >
                        {curso.nombre}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <Horarios listaEstudiantes={listaEstudiantes} />
        </div>
      )}
    </>
  );
}

export default App;
