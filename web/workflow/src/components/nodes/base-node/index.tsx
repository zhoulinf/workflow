import { ComponentType, ReactNode, useMemo } from 'react';
import { Position } from '@xyflow/react';
import { Dialog } from 'radix-ui';
import { useWorkflow } from '@/context';
import { Handle } from '../../handle';

import styles from './index.module.scss';

interface BaseNodeProps {
  children?: ReactNode;
  panelComponents?: Record<string, ComponentType>;
  enableTargetHandle?: boolean;
  enableSourceHandle?: boolean;
}

const BaseNode = (props:BaseNodeProps) => {
  const {
    children, panelComponents, enableTargetHandle = true, enableSourceHandle = true,
  } = props;

  const NodePanel = panelComponents;

  const [workflow] = useWorkflow();
  const { currentNodeId, nodes } = workflow;

  const currentNode = useMemo(
    () => nodes.find((node) => node.id === currentNodeId),
    [currentNodeId, nodes],
  );

  const panelType = currentNode?.data?.type || '';

  const Panel = panelType ? NodePanel?.[panelType as string] : null;

  return (
    <>
      {enableTargetHandle && <Handle type="target" position={Position.Right} />}
      {enableSourceHandle && <Handle type="source" position={Position.Left} />}
      <Dialog.Root>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          {
            Panel ? (
              <Dialog.Content className={styles.content}>
                <Panel />
              </Dialog.Content>
            ) : null
          }
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export {
  BaseNode,
};
