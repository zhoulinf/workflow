import {
  createContext, ReactNode, useContext,
  useRef,
} from 'react';
import { useStore as useZustandStore } from 'zustand';
import { createWorkflowState } from '@/store';
import type { WorkFlowState } from '@/store';

type WorkflowStore = ReturnType<typeof createWorkflowState>
const WorkflowContext = createContext({} as WorkflowStore);
WorkflowContext.displayName = 'WorkflowContext';

const WorkflowProvider = (
  { children }:{children:ReactNode},
) => {
  const storeRef = useRef<WorkflowStore|undefined>();
  if (!storeRef.current) {
    storeRef.current = createWorkflowState();
  }
  return <WorkflowContext.Provider value={storeRef.current}>{children}</WorkflowContext.Provider>;
};

const useWorkflowStore = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('丢失上下文');
  }
  return context;
};

export function useStore<T>(selector: (state: WorkFlowState) => T): T {
  const store = useContext(WorkflowContext);
  if (!store) throw new Error('丢失上下文');
  return useZustandStore(store, selector);
}

export { WorkflowProvider, useWorkflowStore };
