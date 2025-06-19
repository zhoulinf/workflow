import { Edge } from '@xyflow/react';
import type { StateCreator } from 'zustand';

export type WorkFlowEdge = Edge

export type WorkFlowEdgesStates = {
  edges: WorkFlowEdge[],
  setEdges: (edges:WorkFlowEdge[])=>void
  addEdge: (newEdge:WorkFlowEdge)=>void
}

export const createWorkflowEdgesState:StateCreator<WorkFlowEdgesStates> = (set) => ({
  edges: [],
  setEdges: (edges) => set(() => ({ edges })),
  addEdge: (node) => set(({ edges }) => ({ edges: [...edges, node] })),
});
