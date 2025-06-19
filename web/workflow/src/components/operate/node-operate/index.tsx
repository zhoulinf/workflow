import { Panel } from '@xyflow/react';
import { Button, Popover } from '@radix-ui/themes';
import { useWorkflow } from '@/context';
import styles from './index.module.scss';
import { getNewNode } from '@/store/workflow.actions';
import { worflowState } from '@/store/workflow.state';

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
  const context = useWorkflow();
  const handleSelect = (data:Data) => {
    const newNode = getNewNode(data);
    context.changeNodes([...worflowState.staticWorkFlow.nodes, newNode]);
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
