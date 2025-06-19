import { create } from 'zustand';
import { createWorkflowNodesState } from './node-slice';
import type { WorkFlowNodesStates } from './node-slice';

type WorkFlowState = WorkFlowNodesStates
const createWorkflowState = () => create<WorkFlowState>((...args) => ({
  ...createWorkflowNodesState(...args),
}));

export {
  createWorkflowState,
};
