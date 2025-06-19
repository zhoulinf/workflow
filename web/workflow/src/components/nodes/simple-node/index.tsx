/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ComponentType, ReactNode, useMemo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { WorkFlowNode, worflowState } from '@/store/workflow.state';

import { BaseNode } from '../base-node';
import styles from './index.module.scss';
import { HttpPanel } from './http';

// eslint-disable-next-line no-undef
type SimpleNodeProps = NodeProps<WorkFlowNode>;
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
  const { title, type } = data;

  const NodeComponent = nodesMap[type];
  const Icon = Icons[type] || null;

  const handleSelect = () => {
    worflowState.status.currentNodeId = id;
  };

  return (
    <BaseNode
      panelComponents={panelMap}
      {...props}
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
