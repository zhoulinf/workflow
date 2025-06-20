import { Panel } from '@xyflow/react';
import { Button, Popover } from '@radix-ui/themes';
import styles from './index.module.scss';
import type { NodeData } from '@/store/node-slice';
import { generateSimpleNode } from '@/utils';
import { useStore } from '@/context';

const NodeTypeList:NodeData[] = [
  {
    title: 'HTTP',
    type: 'http',
  },
  {
    title: 'llm',
    type: 'llm',
  },
];

const NodeOperate = () => {
  const addNodes = useStore((state) => state.addNodes);
  const nodes = useStore((state) => state.nodes);
  const handleSelect = (data:NodeData) => {
    const preNode = nodes[nodes.length - 1];
    const newNode = generateSimpleNode(data, preNode
      ? { x: preNode.position.x, y: preNode.position.y } : undefined);
    addNodes(newNode);
  };
  return (
    <Panel position="bottom-center" className={styles.root}>
      <Popover.Root>
        <Popover.Trigger>
          <Button color="indigo">
            添加节点
          </Button>
        </Popover.Trigger>
        <Popover.Content height="500px" side="right" className={styles.content} style={{ padding: 0 }}>
          <ul>
            {NodeTypeList.map((item) => (
              <li key={item.type}>
                <button
                  type="button"
                  className={styles.nodeButton}
                  onClick={() => handleSelect(item)}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Root>

    </Panel>
  );
};

export {
  NodeOperate,
};
