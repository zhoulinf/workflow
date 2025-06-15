import {
  addEdge,
  applyEdgeChanges, applyNodeChanges, Connection, Edge, EdgeChange, Node, NodeChange,
} from '@xyflow/react';
import { useCallback } from 'react';
import { WrokFlow } from '@/components/workflow';
import { useWorkflow } from '@/context';

export const WorkFlowMain = () => {
  const [, workflowStore] = useWorkflow();
  const { nodes, edges } = workflowStore;

  const handleNodeChange = (change:NodeChange<Node>[]) => {
    workflowStore.nodes = applyNodeChanges(change, workflowStore.nodes);
  };

  const handleEdgesChange = (change:EdgeChange<Edge>[]) => {
    workflowStore.edges = applyEdgeChanges(change, workflowStore.edges);
  };

  const handleConnect = useCallback((connection:Connection) => {
    workflowStore.edges = addEdge(connection, workflowStore.edges);
  }, [workflowStore]);

  return (
    <WrokFlow
      nodes={nodes}
      onNodesChange={handleNodeChange}
      onEdgesChange={handleEdgesChange}
      onConnect={handleConnect}
      edges={edges}
    />
  );
};
