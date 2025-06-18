import { proxy, ref } from 'valtio';
import { derive } from 'derive-valtio';
import { Edge, Node } from '@xyflow/react';

type NodeType= 'http'| 'llm' | ''

type NodeData = Node<{
  type:NodeType,
}>

interface WorkFlowState{
  staticWorkFlow:{
    nodes: NodeData[]
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
    nodes: [],
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
});

export type{
  NodeData,
  NodeType,
};
