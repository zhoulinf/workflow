import React, {
  ComponentType, createContext, ReactNode, useContext, useMemo, useState,
} from 'react';
import { NodeProps } from '@xyflow/react';
import { Dialog } from 'radix-ui';
import { Handle } from '../../handle';

import styles from './index.module.scss';

type BaseNodeProps = NodeProps & {
  children?: ReactNode;
  panelComponents?: Record<string, ComponentType>;
  panelOpen?: boolean;
}

type BaseNodeContextData = {
  panelOpen:boolean,
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const BaseNodeContext = createContext({} as BaseNodeContextData);

const useBaseNodeContext = () => useContext(BaseNodeContext);

const InternalBaseNode = (props:BaseNodeProps) => {
  const {
    children, panelComponents, targetPosition, sourcePosition, data, panelOpen,
  } = props;
  const context = useBaseNodeContext();
  const NodePanel = panelComponents;
  const { type } = data || {};
  const panelType = type || '';
  const Panel = panelType ? NodePanel?.[panelType as string] : null;

  return (
    <>
      {targetPosition && <Handle type="target" position={targetPosition} />}
      {sourcePosition && <Handle type="source" position={sourcePosition} />}
      <Dialog.Root open={panelOpen} onOpenChange={(open) => context.setPanelOpen(open)}>
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

const BaseNode = (props:BaseNodeProps) => {
  const [panelOpen, setPanelOpen] = useState(false);

  const context = useMemo(() => ({ panelOpen, setPanelOpen }), [panelOpen]);

  return (
    <BaseNodeContext.Provider value={context}>
      <InternalBaseNode {...props} panelOpen={panelOpen} />
    </BaseNodeContext.Provider>
  );
};

export {
  BaseNode,
  useBaseNodeContext,
};
