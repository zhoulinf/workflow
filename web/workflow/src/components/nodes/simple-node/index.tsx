/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ComponentType, ReactNode, useMemo } from 'react';
import type { NodeProps, Node } from '@xyflow/react';

import { BaseNode } from '../base-node';
import styles from './index.module.scss';
import { HttpPanel } from './http';
import { useWorkflow } from '@/context';

// eslint-disable-next-line no-undef
type SimpleNodeProps = NodeProps<Node<WorkFlow.NodeData>>;
// 原始组件映射表
const nodesMap:Record<string, ComponentType> = {

};

const panelMap:Record<string, ComponentType> = {
  http: HttpPanel,
  // 'llm': LlmPanel,
  // 添加其他面板组件
};

const Icons: Record<string, ReactNode> = {

};

const SimpleNode = (props:SimpleNodeProps) => {
  const { data, id } = props;
  const {
    title, type, enableTargetHandle, enableSourceHandle,
  } = data;

  const [, workflowStore] = useWorkflow();

  const NodeComponent = nodesMap[type];
  const Icon = Icons[type] || null;

  const handleSelect = () => {
    workflowStore.currentNodeId = id;
  };

  return (
    <BaseNode
      panelComponents={panelMap}
      enableTargetHandle={enableTargetHandle}
      enableSourceHandle={enableSourceHandle}
    >
      <div className={styles.root} onClick={handleSelect}>
        <div className={styles.header}>
          <div>{Icons[type]}</div>
          {Icon || (<div className={styles.icon}>{title.toUpperCase()}</div>) }
          <div>{title}</div>
        </div>
        {NodeComponent ? <NodeComponent /> : null}
      </div>
    </BaseNode>
  );
};

export {
  SimpleNode,
};
