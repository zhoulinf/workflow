import { useSnapshot } from 'valtio';
import { worflowState } from '@/store/workflow.state';
import { WorkFlow } from '@/components/workflow';

export const WorkFlowMain = () => {
  const { staticWorkFlow: { nodes, edges } } = useSnapshot(worflowState);

  return (
    <WorkFlow
      nodes={nodes}
      edges={edges}
    />
  );
};
