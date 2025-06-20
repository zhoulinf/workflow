import {
  addEdge,
  applyEdgeChanges, applyNodeChanges, Connection, EdgeChange, NodeChange,
} from '@xyflow/react';
import { useCallback } from 'react';
import { WorkFlow } from '@/components/workflow';
import { useStore } from '@/context';
import type { WorkFlowNode } from '@/store/node-slice';

export const WorkFlowMain = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);

  const handleEdgesChange = (changes:EdgeChange[]) => {
    setEdges(applyEdgeChanges(changes, edges));
  };

  const handleNodeChange = (changes:NodeChange[]) => {
    setNodes(applyNodeChanges(changes, nodes) as WorkFlowNode[]);
  };

  const handleConnect = useCallback(
    (params:Connection) => setEdges(addEdge(params, edges)),
    [edges, setEdges],
  );

  return (
    <WorkFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={handleNodeChange}
      onEdgesChange={handleEdgesChange}
      onConnect={handleConnect}
    />
  );
};
