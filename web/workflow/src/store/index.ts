import { create } from 'zustand';
import { createWorkflowNodesState } from './node-slice';
import { createWorkflowEdgesState } from './edges-slice';
import { createWorkflowStatusState, WorkFlowStatus } from './status-slice';
import { createWorkflowMetaState } from './meta-slice';

import type { WorkFlowNodesStates } from './node-slice';
import type { WorkFlowEdgesStates } from './edges-slice';
import type { WorkFlowMetaState } from './meta-slice';

type WorkFlowState = WorkFlowNodesStates & WorkFlowEdgesStates & WorkFlowStatus &WorkFlowMetaState
const createWorkflowState = () => create<WorkFlowState>((...args) => ({
  ...createWorkflowNodesState(...args),
  ...createWorkflowEdgesState(...args),
  ...createWorkflowStatusState(...args),
  ...createWorkflowMetaState(...args),
}));

export {
  createWorkflowState,
};

export type {
  WorkFlowState,
};
