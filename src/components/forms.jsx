import { Grafo } from "./grafo";

export const Forms = ({
  cantidad,
  agregarEstudiante,
  listaEstudiantes,
  grafo,
  iniciarColoracion,
  probarEjemplo,
  setCantidad,
  setListaEstudiantes,
  cursos
}) => {
  return (
    <div className="flex justify-center gap-12 mb-10">
      <div className="flex flex-col">
        <div className="flex gap-2.5 py-2 border-b-2 mb-3">
          <label htmlFor="cantidadCursos">Ingrese la Cantidad de Cursos</label>
          <input
            name="cantidadCursos"
            type="number"
            value={cantidad}
            min={1}
            max={10}
            onChange={(e) => {
              setCantidad(parseInt(e.target.value));
              setListaEstudiantes([]);
            }}
            className="border p-1 w-[10%] text-center"
          />
          <button
            className="bg-gray-200 px-2 hover:bg-gray-300"
            onClick={() => {
              setCantidad(5);
              setListaEstudiantes([]);
            }}
          >
            5
          </button>
          <button
            className="bg-gray-200 px-2 hover:bg-gray-300"
            onClick={() => {
              setCantidad(10);
              setListaEstudiantes([]);
            }}
          >
            10
          </button>
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
  );
};
