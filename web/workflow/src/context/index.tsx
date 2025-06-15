import {
  createContext, ReactNode, useContext, useMemo,
} from 'react';
import { proxy, useSnapshot } from 'valtio';
import { WorkFlow } from '../store/workflow';

interface WorkflowContextType {
  workflow: WorkFlow;
}

const WorkflowContext = createContext({} as WorkflowContextType);
WorkflowContext.displayName = 'WorkflowContext';

const createWorkflowInstanceFactory = () => {
  let workflowInstance: WorkFlow | null = null;

  return () => {
    if (!workflowInstance) {
      workflowInstance = proxy(new WorkFlow());
    }
    return workflowInstance;
  };
};

const createWorkflowInstance = createWorkflowInstanceFactory();

const WorkflowProvider = ({ children }:{children:ReactNode}) => {
  const contextValue = useMemo(() => ({ workflow: createWorkflowInstance() }), []);
  return <WorkflowContext.Provider value={contextValue}>{children}</WorkflowContext.Provider>;
};

const useWorkflow = () => {
  const { workflow } = useContext(WorkflowContext);
  return [useSnapshot(workflow), workflow] as const;
};

export { WorkflowProvider, useWorkflow };
