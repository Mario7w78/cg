import { useEffect, useRef } from "react";
import { Network } from "vis-network/peer";

export function Grafo({ horario, cursos }) {
  const containerRef = useRef(null);
  const colores = ["#0000FF", "#ff0000", "#00FF00", "#ffff00", "#fe7349"];
  useEffect(() => {
    const nodes = horario.map((_, i) => ({
      id: i,
      label: `Curso ${i}`,
      color:
        cursos[i] && cursos[i].getColor
          ? colores[cursos[i].getColor - 1]
          : "#cbcbcb",
    }));

    const edges = [];
    horario.forEach((fila, i) => {
      fila.forEach((valor, j) => {
        if (valor === 1 && i < j) {
          edges.push({ from: i, to: j });
        }
      });
    });

    const data = { nodes, edges };

    const options = {
      layout: { hierarchical: false },
      nodes: { shape: "dot", size: 20 },
      edges: { color: "#000" },
    };

    new Network(containerRef.current, data, options);
  }, [horario, cursos]);

  return <div ref={containerRef} className="w-[300px] h-[300px] border-1" />;
}
