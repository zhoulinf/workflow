import {
  createContext, ReactNode, useContext,
  useMemo,
} from 'react';

type WorkflowContextType = Record<string, string>

const WorkflowContext = createContext({} as WorkflowContextType);
WorkflowContext.displayName = 'WorkflowContext';

const WorkflowProvider = (
  { children }:{children:ReactNode},
) => {
  const value = useMemo(() => (
    {
      default: '',
    }
  ), []);
  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
};

const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  return context;
};

export { WorkflowProvider, useWorkflow };
