import { useEffect, useRef } from "react";
import { Network } from "vis-network/peer";

export function Grafo({ horario, cursos, nombres }) {
  const containerRef = useRef(null);
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


  useEffect(() => {
    const nodes = horario.map((_, i) => ({
      id: i,
      label: nombres[i].nombre,
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
      nodes: { shape: "dot", size: 10 },
      edges: { color: "#000" },
    };

    new Network(containerRef.current, data, options);
  }, [horario, cursos]);

  return <div ref={containerRef} className="w-[500px] h-[300px] border-1" />;
}
