import {
  createContext, ReactNode, useCallback, useContext,
  useMemo,
  useState,
} from 'react';
import { useLatest } from 'ahooks';
import { Edge } from '@xyflow/react';
import { staticWorkFlow, WorkFlowNode } from '@/store/workflow.state';

type WorkflowContextType = {
  nodes:WorkFlowNode[],
  edges:Edge[],
  nodesLatest:WorkFlowNode[],
  edgesLatest: Edge[],
  changeNodes: (change:WorkFlowNode[])=>void
  changeEdges: (change:Edge[])=>void
}

const WorkflowContext = createContext({} as WorkflowContextType);
WorkflowContext.displayName = 'WorkflowContext';

const WorkflowProvider = (
  { children }:{children:ReactNode},
) => {
  const [nodes, setNodes] = useState(staticWorkFlow.nodes);
  const [edges, setEdges] = useState(staticWorkFlow.edges);

  const latestNodes = useLatest(nodes);
  const latestEdges = useLatest(edges);

  const changeNodes = useCallback((change: WorkFlowNode[]) => {
    setNodes(change);
    staticWorkFlow.nodes = latestNodes.current;
  }, [latestNodes]);

  const changeEdges = useCallback((change: Edge[]) => {
    setEdges(change);
    staticWorkFlow.edges = latestEdges.current;
  }, [latestEdges]);
  const value = useMemo(() => (
    {
      nodes,
      edges,
      nodesLatest: latestNodes.current,
      edgesLatest: latestEdges.current,
      changeNodes,
      changeEdges,
    }
  ), [changeEdges, changeNodes, edges, latestEdges, latestNodes, nodes]);
  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
};

const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('丢失上下文');
  }
  return context;
};

export { WorkflowProvider, useWorkflow };
