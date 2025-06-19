import { proxy, ref } from 'valtio';
import { derive } from 'derive-valtio';
import { Edge, Node, Position } from '@xyflow/react';
import { CUSTOM_SIMPLE_NODE } from '@/constant';

type NodeType= 'http'| 'llm' | 'start'

type NodeData = {
  type:NodeType,
  title: string,
}

type WorkFlowNode = Node<NodeData>

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

export const worflowState = proxy<WorkFlowState>({
  // 用于页面静态渲染的工作流节点数据
  staticWorkFlow: {
    nodes: initialNodes,
    edges: [],
  },
  // 用于存储 不引起页面更新的数据,主要是每个节点一些拓展数据
  metaData: ref(new Map()),
  // 主要是一些交互相关的状态，比如当前操作的nodeId
  status: {
    currentNodeId: null,
  },
});

// 当前
export const currentNode = derive({
  data: (get) => {
    const { nodes } = get(worflowState).staticWorkFlow;
    const { currentNodeId } = get(worflowState).status;
    if (!currentNodeId) {
      return null;
    }
    const curNode = nodes.find((node) => node.id === currentNodeId);
    return curNode?.data || null;
  },
  metaData: (get) => {
    const { currentNodeId } = get(worflowState).status;
    if (!currentNodeId) {
      return null;
    }
    const { metaData } = get(worflowState);
    return metaData.get(currentNodeId);
  },
  id: (get) => {
    const { currentNodeId } = get(worflowState).status;
    return currentNodeId;
  },
  preNode: (get) => {
    const { nodes } = get(worflowState).staticWorkFlow;
    const { currentNodeId } = get(worflowState).status;
    if (!currentNodeId) {
      return nodes[nodes.length - 1];
    }
    const findIndex = nodes.findIndex((node) => node.id === currentNodeId);
    if (findIndex !== -1 && findIndex !== 0) {
      return nodes[findIndex - 1];
    }
    return null;
  },
});

export const staticWorkFlow = derive({
  nodes: (get) => get(worflowState).staticWorkFlow.nodes,
  edges: (get) => get(worflowState).staticWorkFlow.edges,
});

export type{
  WorkFlowNode,
  NodeData,
  NodeType,
};
