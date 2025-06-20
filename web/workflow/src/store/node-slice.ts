import { Node, Position } from '@xyflow/react';
import type { StateCreator } from 'zustand';
import { CUSTOM_SIMPLE_NODE } from '@/constant';

type NodeType= 'http'| 'llm' | 'start'
export type NodeData = {
  type:NodeType,
  title: string,
}

export type WorkFlowNode = Node<NodeData>

const initialNodes:WorkFlowNode[] = [
  {
    id: 'start',
    type: CUSTOM_SIMPLE_NODE,
    position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    data: {
      title: '开始',
      type: 'start',
    },
    targetPosition: Position.Right,
  },
];

export type WorkFlowNodesStates = {
  nodes: WorkFlowNode[],
  setNodes: (nodes:WorkFlowNode[])=>void
  addNodes: (newNode:WorkFlowNode)=>void
}

export const createWorkflowNodesState:StateCreator<WorkFlowNodesStates> = (set) => ({
  nodes: initialNodes,
  setNodes: (nodes) => set(() => ({ nodes })),
  addNodes: (node) => set(({ nodes }) => ({ nodes: [...nodes, node] })),
});
