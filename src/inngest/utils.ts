import { Connection, Node } from "@/generated/prisma";
import toposort from "toposort";

export const topoloicalSort = (
  nodes: Node[],
  connections: Connection[]
): Node[] => {
  // if no connections, return nodes as-is (no need to sort)
  if (connections.length === 0) {
    return nodes;
  }

  // create edges array for toposort
  const edges: [string, string][] = connections.map((connection) => [
    connection.fromNodeId,
    connection.toNodeId,
  ]);

  // Add nodes with no connections as self-edges to ensure they're included

  const connectedNodesIds = new Set<string>();

  for (const conn of connections) {
    connectedNodesIds.add(conn.fromNodeId);
    connectedNodesIds.add(conn.toNodeId);
  }

  for (const node of nodes) {
    if (!connectedNodesIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  // Perform topological sort
  let sortedNodeids: string[];

  try {
    sortedNodeids = toposort(edges);

    // remove duplicate nodes (from self-edges)
    sortedNodeids = [...new Set(sortedNodeids)];
  } catch (error) {
    if (error instanceof Error && error.message.includes("cyclic")) {
      throw new Error("Cyclic dependency detected");
    }
    throw error;
  }

  // Map sorted node ids to nodes
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  return sortedNodeids.map((id) => nodeMap.get(id)!).filter(Boolean);
};
