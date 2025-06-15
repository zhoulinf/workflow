/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ComponentType, ReactNode, useMemo } from 'react';
import type { NodeProps, Node } from '@xyflow/react';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withSimplePanel = (Component: ComponentType): ComponentType => () => {
  const [{ currentNodeId, nodes }] = useWorkflow();
  const currentNode = useMemo(
    () => nodes.find((node) => node.id === currentNodeId),
    [currentNodeId, nodes],
  );
  const title = (currentNode?.data?.title ?? '') as string;
  return (
    <>
      <div className={styles['header-panel']}>
        <div className={styles['panel-title']}>{title}</div>
        <div className={styles.close}><EnvelopeClosedIcon /></div>
      </div>
      <div>
        <Component {...currentNode} />
      </div>
    </>
  );
};

const panelComponents: Record<string, ComponentType> = Object.keys(panelMap).reduce((acc, key) => {
  const Component = panelMap[key];
  if (Component) {
    acc[key] = withSimplePanel(Component);
  }
  return acc;
}, {} as Record<string, ComponentType>);

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
      panelComponents={panelComponents}
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
