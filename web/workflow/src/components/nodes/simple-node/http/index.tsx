import React, { useCallback, useMemo, useState } from 'react';
import { Collapsible } from 'radix-ui';
import {
  ChevronDownIcon, ChevronUpIcon, PlusCircledIcon, MinusCircledIcon,
} from '@radix-ui/react-icons';
import { useSnapshot } from 'valtio';
import * as Panel from '../../../panel/base-panel';
import { setMetaData } from '@/store/workflow.actions';

import styles from './index.module.scss';
import { worflowState, currentNode } from '@/store/workflow.state';

interface TogglePanelProps{
  triggerNode: React.ReactNode;
  children: React.ReactNode
}
const TogglePanel = (props:TogglePanelProps) => {
  const { triggerNode, children } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild>
          <span className={styles.toggle}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            {triggerNode}
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content className={styles['toggle-content']}>
          {children}
        </Collapsible.Content>
      </Collapsible.Root>
      <div className={styles.line} />
    </>
  );
};

const OPTIONS = ['POST', 'GET'];

const HttpForm = () => {
  const [formData, setFormData] = useState(currentNode.metaData);

  const handleSubmit = useCallback((e:React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = worflowState.status.currentNodeId;
    if (!id) {
      return;
    }
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setMetaData(id, data);
  }, []);

  const handleChange:React.FormEventHandler<HTMLFormElement> = (e) => {
    const { value, name } = e.target || {};
    if (!currentNode.id) {
      return;
    }
    worflowState.metaData.set(currentNode.id, { ...currentNode.metaData, [name]: value });
  };

  return (
    <form action="#" onSubmit={handleSubmit} onChange={handleChange}>
      <TogglePanel triggerNode="API">
        <>
          <select name="method" id="method">
            {OPTIONS.map((option) => <option value={option}>{option}</option>)}
          </select>
          <input type="text" name="url" />
        </>
      </TogglePanel>
      <TogglePanel triggerNode="请求参数（默认json）">
        <textarea name="params" />
      </TogglePanel>

      <TogglePanel triggerNode={(
        <>
          <span>输出</span>
          <PlusCircledIcon onClick={addOutput} />
        </>
      )}
      >
        {outputList.map((output) => (
          <div className={styles.inline}>
            {output.map((item, index) => (
              <div>
                <label htmlFor="">{item.label}</label>
                <div className="flex">
                  <input type="text" />
                  <MinusCircledIcon onClick={(e) => { removeOutput(e, index); }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </TogglePanel>
      <button type="submit">提交</button>
    </form>
  );
};

const HttpPanel = () => {
  const [, workflowStore] = useWorkflow();
  const { nodes, currentNodeId } = workflowStore;
  const currentNode = useMemo(
    () => nodes.find((item) => currentNodeId === item.id),
    [currentNodeId, nodes],
  );

  const data = currentNode?.data;
  const { title } = data || {};
  return (
    <Panel.Root>
      <Panel.Header>
        <span>{title}</span>
      </Panel.Header>
      <Panel.Content className={styles.content}>
        <HttpForm />
      </Panel.Content>
    </Panel.Root>
  );
};

export {
  HttpPanel,
};
