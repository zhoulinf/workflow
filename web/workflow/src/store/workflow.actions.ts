import { NodeChange, Position } from '@xyflow/react';
import { CUSTOM_SIMPLE_NODE } from '@/constant';
import { worflowState, currentNode } from './workflow.state';
import type { NodeData } from './workflow.state';

import { computePosition } from './utils';

export const getNewNode = (data:NodeData) => {
  const { preNode } = currentNode;
  const position = preNode?.position;
  return {
    id: `http${Date.now()}`,
    type: CUSTOM_SIMPLE_NODE,
    data,
    position: computePosition(position),
    targetPosition: Position.Right,
    sourcePosition: Position.Left,
  };
};

const updateNodeConfig = () => {

};

const deleteNode = (id:string) => {

};

export const addEdge = (data) => {

};

const deleteEdge = () => {

};

const startWorkFlow = () => {

};

const executeNode = () => {

};

const nodeChange = (changes:NodeChange[]) => {

};

export const setMetaData = (id:string, data:object) => {

};
