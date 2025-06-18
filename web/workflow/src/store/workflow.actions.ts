import { CUSTOM_SIMPLE_NODE } from '@/constant';
import { worflowState } from './workflow.state';

export const addNode = (data) => {
  worflowState.staticWorkFlow.nodes.push({
    id: `http${Date.now()}`,
    type: CUSTOM_SIMPLE_NODE,
    data,
    position: { x: 250, y: 25 },
  });
  console.info(worflowState.staticWorkFlow.nodes);
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

const nodeChange = () => {

};

export const setMetaData = (id:string, data:object) => {

};
