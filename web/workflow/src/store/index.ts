import { create } from 'zustand';
import { Edge, Node, Position } from '@xyflow/react';
import { CUSTOM_SIMPLE_NODE } from '@/constant';
import { createWorkflowNodesState } from './node';

type NodeType= 'http'| 'llm' | 'start'

type NodeData = {
  type:NodeType,
  title: string,
}

type WorkFlowNode = Node<NodeData>

interface WorkFlowAction{

}

interface WorkFlowState{
  staticWorkFlow:{
    nodes: WorkFlowNode[]
    edges: Edge[]
  },
  metaData:Map<string, object>,
  status:{
    currentNodeId: string| null
  }
}

const createWorkflowState = () => create((...args) => ({
  ...createWorkflowNodesState(...args),
}));

export {
  createWorkflowState,
};
