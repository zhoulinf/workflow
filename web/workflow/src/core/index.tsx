import { useSnapshot } from 'valtio';
import { applyNodeChanges, NodeChange } from '@xyflow/react';
import { staticWorkFlow } from '@/store/workflow.state';
import { WorkFlow } from '@/components/workflow';

export const WorkFlowMain = () => {
  const { nodes, edges } = useSnapshot(staticWorkFlow);

  const handleNodeChange = (changes:NodeChange[]) => {
    staticWorkFlow.nodes = applyNodeChanges(changes, staticWorkFlow.nodes);
  };

  return (
    <WorkFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={handleNodeChange}
    />
  );
};
