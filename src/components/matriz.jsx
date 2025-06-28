export const Matriz = ({ horario, nombres }) => {
  return (
    <div>
      <table className="w-[50vw] border-1 p-2 border-collapse">
        <thead>
          <tr className="border-b bg-orange-300">
            <th className="border-r"></th>
            {horario.map((_, i) => (
              <th>{nombres[i].nombre.substr(0, 1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horario.map((fila, i) => (
            <tr key={i} className="border-b">
              <th className="border-r bg-orange-300">
                {nombres[i].nombre.substr(0,1)}
              </th>
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
