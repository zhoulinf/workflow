import { ReactFlow } from '@xyflow/react';
import type { ReactFlowProps } from '@xyflow/react';
import { Background } from '../background';
import { SimpleNode } from '../nodes/simple-node';
import { NodeOperate } from '../operate';
import { CUSTOM_SIMPLE_NODE } from '@/constant';

import '@xyflow/react/dist/style.css';

import styles from './index.module.scss';

type WrokFlowProps = Omit<ReactFlowProps, 'proOption'| 'nodeTypes' | 'edgeTypes'>;

const nodeTypes = {
  [CUSTOM_SIMPLE_NODE]: SimpleNode,
};

const WrokFlow = (props:WrokFlowProps) => (
  <div className={styles.root}>
    <ReactFlow
      proOptions={{ hideAttribution: true }}
      nodeTypes={nodeTypes}
      {...props}
    >
      <Background />
      <NodeOperate />
    </ReactFlow>
  </div>
);

export { WrokFlow };
