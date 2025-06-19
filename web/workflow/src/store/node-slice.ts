import { Node } from '@xyflow/react';
import type { StateCreator } from 'zustand';

type NodeType= 'http'| 'llm' | 'start'
type NodeData = {
  type:NodeType,
  title: string,
}

export type WorkFlowNode = Node<NodeData>

export type WorkFlowNodesStates = {
  nodes: WorkFlowNode[],
  setNodes: (nodes:WorkFlowNode[])=>void
  addNodes: (newNode:WorkFlowNode)=>void
}

export const createWorkflowNodesState:StateCreator<WorkFlowNodesStates> = (set) => ({
  nodes: [],
  setNodes: (nodes) => set(() => ({ nodes })),
  addNodes: (node) => set(({ nodes }) => ({ nodes: [...nodes, node] })),
});
