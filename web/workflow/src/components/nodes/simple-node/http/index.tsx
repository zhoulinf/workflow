/* eslint-disable no-restricted-syntax */
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Form } from 'radix-ui';
import { PlayIcon } from '@radix-ui/react-icons';
import * as Panel from '../../../panel/base-panel';
import { Select } from '@/ui/select';
import { useStore, useWorkflowStore } from '@/context';
import { WorkFlowNode } from '@/store/node-slice';

import styles from './index.module.scss';

type HttpFormProps = WorkFlowNode

const METHODS = ['POST', 'GET'];

type FormData = {
  method:string;
  url:string;
  body:string;
}

const HttpForm = (props:HttpFormProps) => {
  const { id } = props;
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const store = useWorkflowStore().getState();

  const setMetaData = useStore((state) => state.setMetaData);

  const handleSubmit = useCallback((e:React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setMetaData(id, data);
  }, [id, setMetaData]);

  const handleChange = (value:string, name:string) => {
    setFormData((state) => ({ ...state, [name]: value }));
    const currentMetaData = store.metaData.get(id);
    if (!currentMetaData) {
      setMetaData(id, { [name]: value });
      return;
    }
    setMetaData(id, { ...currentMetaData, [name]: value });
  };

  useEffect(() => {
    const currentMetaData = store.metaData.get(id);
    if (currentMetaData) {
      setFormData(currentMetaData as FormData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form.Root action="#" onSubmit={handleSubmit}>
      <Form.Field name="method">
        <Form.Label>Method</Form.Label>
        <Select
          onValueChange={(value) => handleChange(value, 'method')}
          value={formData.method}
          options={METHODS.map((method) => ({ value: method, label: method }))}
          name="method"
        />
      </Form.Field>
      <Form.Field name="url">
        <Form.Label>URL</Form.Label>
        <input
          value={formData.url}
          onChange={(e) => handleChange(e.target.value, 'url')}
          name="url"
        />
      </Form.Field>
      <Form.Field name="body">
        <Form.Label>Body</Form.Label>
        <textarea
          value={formData.body}
          onChange={(e) => handleChange(e.target.value, 'body')}
          name="body"
        />
      </Form.Field>
    </Form.Root>
  );
};

const HttpPanel = () => {
  const currentNode = useStore((state) => state.currentOperateNode);
  if (!currentNode) {
    return null;
  }
  const { title = '' } = currentNode.data || {};
  return (
    <Panel.Root>
      <Panel.Header>
        <span>{title}</span>
        <span className={styles.head}><PlayIcon className={styles.icon} /></span>
      </Panel.Header>
      <Panel.Content className={styles.content}>
        <HttpForm {...currentNode} />
        <div>
          <h3>执行结果</h3>
          <div />
        </div>
      </Panel.Content>
    </Panel.Root>
  );
};

export {
  HttpPanel,
};
