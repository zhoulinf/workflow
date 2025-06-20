import { ComponentType, ReactNode } from 'react';
import type { NodeProps } from '@xyflow/react';
import { BaseNode } from '../base-node';
import styles from './index.module.scss';
import { HttpPanel } from './http';
import type { WorkFlowNode } from '@/store/node-slice';
import { useStore } from '@/context';

// eslint-disable-next-line no-undef
type SimpleNodeProps = NodeProps<WorkFlowNode>;
// 原始组件映射表
const nodesMap:Record<string, ComponentType> = {

};

const panelMap:Record<string, ComponentType> = {
  http: HttpPanel,
  // 'llm': LlmPanel,
};

const Icons: Record<string, ReactNode> = {

};

const SimpleNode = (props:SimpleNodeProps) => {
  const nodes = useStore((state) => state.nodes);
  const setCurrentOperateId = useStore((state) => state.setCurrentOperateId);
  const setCurrentOperateNode = useStore((state) => state.setCurrentOperateNode);
  const { data, id } = props;
  const { title, type } = data;

  const NodeComponent = nodesMap[type];
  const Icon = Icons[type] || null;

  const handleSelect = () => {
    setCurrentOperateId(id);
    const currentNode = nodes.find((node) => node.id === id);
    if (!currentNode) {
      return;
    }
    setCurrentOperateNode(currentNode);
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
