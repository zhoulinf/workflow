import { ComponentType, ReactNode, useMemo } from 'react';
import { NodeProps, Position } from '@xyflow/react';
import { Dialog } from 'radix-ui';
import { useSnapshot } from 'valtio';
import { currentNode } from '@/store/workflow.state';
import { Handle } from '../../handle';

import styles from './index.module.scss';

type BaseNodeProps = NodeProps & {
  children?: ReactNode;
  panelComponents?: Record<string, ComponentType>;
}

const BaseNode = (props:BaseNodeProps) => {
  const {
    children, panelComponents, targetPosition, sourcePosition,
  } = props;

  const NodePanel = panelComponents;

  const { data } = useSnapshot(currentNode);
  const { type } = data || {};

  const panelType = type || '';

  const Panel = panelType ? NodePanel?.[panelType as string] : null;

  return (
    <>
      {targetPosition && <Handle type="target" position={targetPosition} />}
      {sourcePosition && <Handle type="source" position={sourcePosition} />}
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
