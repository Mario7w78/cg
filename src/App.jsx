import { useState, useEffect } from "react";
import { Matriz } from "./components/matriz";
import { Grafo } from "./components/grafo";
import { Horario } from "./graph/horario";

function App() {
  const [cantidad, setCantidad] = useState(0);
  const [horario, setHorario] = useState(null);
  const [grafo, setGrafo] = useState(null);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    if (cantidad > 0 && cantidad < 12) {
      const h = new Horario(cantidad);
      setHorario(h.getHorario);
      setGrafo(h);
      setCursos([])
    }
  }, [cantidad]);

  const iniciarColoracion = () => {
    grafo.coloracion();
    setCursos(grafo.getCursos);
  };

  return (
    <>
      <div className="text-center">
        <h1 className="m-4 font-bold text-3xl">Coloración de Grafos</h1>
        <label htmlFor="cantidadCursos">Ingrese la Cantidad de Cursos</label>
        <br />
        <input
          name="cantidadCursos"
          type="number"
          min={1}
          max={10}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
          className="border p-1 m-2"
        />
        <details>
          <summary >Matriz de adyacencia</summary>
          <div className="flex justify-center">
          <ul className="text-left">
            <li >
              <b>1</b>: Hay al menos un alumno que está inscrito tanto en el
              curso i como en el curso j.
            </li>
            <li>
              <b>0</b>: No hay estudiantes en común entre los cursos i y j
            </li>
          </ul>
          </div>
        </details>
      </div>
      {horario && (
        <div className="w-full h-full flex flex-col items-center gap-4 mt-4">
          <Matriz horario={horario} />
          <Grafo horario={horario} cursos={cursos} />
          <button
            className="border p-1 hover:cursor-pointer"
            onClick={iniciarColoracion}
          >
            Iniciar Coloracion de grafos
          </button>
        </div>
      )}
    </>
  );
}

export default App;
