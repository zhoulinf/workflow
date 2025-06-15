import { Edge, Node } from '@xyflow/react';
import { CUSTOM_SIMPLE_NODE } from '@/constant';

const initialNodes = [
  {
    id: 'start',
    type: CUSTOM_SIMPLE_NODE,
    data: {
      label: '开始',
      type: 'start',
      title: '开始',
      enableSourceHandle: false,
    },
    position: { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 100 },
  },
];

export class WorkFlow {
  nodes: Node[] = initialNodes;

  edges: Edge[] = [];

  currentNodeId?: string = undefined;

  addSimpleNode(data: {label: string;
      type: string;
      title: string;}) {
    const lastNode = this.nodes[this.nodes.length - 1];
    const { position } = lastNode;
    this.nodes = [
      ...this.nodes,
      {
        id: `${data.type}_${Date.now()}`,
        type: CUSTOM_SIMPLE_NODE,
        position: { x: position.x + 300, y: position.y },
        data,
      },
    ];
  }
}
