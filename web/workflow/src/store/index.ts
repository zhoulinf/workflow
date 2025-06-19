import { create } from 'zustand';
import { createWorkflowNodesState } from './node-slice';
import { createWorkflowEdgesState } from './edges-slice';
import type { WorkFlowNodesStates } from './node-slice';
import type { WorkFlowEdgesStates } from './edges-slice';

type WorkFlowState = WorkFlowNodesStates & WorkFlowEdgesStates
const createWorkflowState = () => create<WorkFlowState>((...args) => ({
  ...createWorkflowNodesState(...args),
  ...createWorkflowEdgesState(...args),
}));

export {
  createWorkflowState,
};
