import { WorkFlowMain } from './core';
import { WorkflowProvider } from './context';

export const App = () => <WorkflowProvider><WorkFlowMain /></WorkflowProvider>;
