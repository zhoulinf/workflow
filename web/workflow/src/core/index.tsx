import {
  applyEdgeChanges, applyNodeChanges, Edge, EdgeChange, NodeChange,
} from '@xyflow/react';
import { useCallback } from 'react';
import { useSnapshot } from 'valtio';
import { WorkFlow } from '@/components/workflow';
import { WorkFlowNode, staticWorkFlow, worflowState } from '@/store/workflow.state';

export const WorkFlowMain = () => {
  const { edges, nodes } = useSnapshot(staticWorkFlow);

  const handleEdgesChange = useCallback((changes:EdgeChange[]) => {
    worflowState.staticWorkFlow.edges = applyEdgeChanges(changes, staticWorkFlow.edges);
  }, [edges]);

  const handleNodeChange = useCallback((changes:NodeChange[]) => {
    const newNodes = applyNodeChanges(changes, staticWorkFlow.nodes) as WorkFlowNode[];
    console.log(newNodes, 'nodes');
    worflowState.staticWorkFlow.nodes = newNodes;
  }, [nodes]);

  return (
    <WorkFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={handleNodeChange}
      onEdgesChange={handleEdgesChange}
    />
  );
};
