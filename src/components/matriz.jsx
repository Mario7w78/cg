export const Matriz = ({ horario }) => {
  return (
    <div>
      <table className="w-[50vw] border-1 p-2 border-collapse">
        <thead>
          <tr className="border-b bg-gray-300">
            <th className="border-r">Horario</th>
            {horario.map((_, i) => (
              <th>{"Curso " + i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horario.map((fila, i) => (
            <tr key={i} className="border-b">
              <th className="border-r bg-gray-300">{"Curso " + i}</th>
              {fila.map((valor, j) => (
                <td key={j} className="text-center">
                  {valor}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
