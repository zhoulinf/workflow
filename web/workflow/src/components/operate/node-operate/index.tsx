import { Panel } from '@xyflow/react';
import { Button, Popover } from '@radix-ui/themes';
import styles from './index.module.scss';
import { addNode } from '@/store/workflow.actions';

interface Data{
  label: string;
  title: string;
  type: string;
}
const NodeTypeList:Data[] = [
  {
    label: 'HTTP',
    title: 'HTTP',
    type: 'http',
  },
  {
    label: '大模型',
    title: 'llm',
    type: 'llm',
  },
  {
    label: '插件',
    title: '插件',
    type: 'plugin',
  },
];

const NodeOperate = () => {
  const handleSelect = (data:Data) => {
    addNode(data);
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
                  {item.label}
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
