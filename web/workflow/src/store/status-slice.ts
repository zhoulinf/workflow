/*
   Status 主要是存储一些当前操作态的内容，比如当前操作节点等

*/

import type { StateCreator } from 'zustand';
import { WorkFlowNode } from './node-slice';

export type WorkFlowStatus = {
   currentOperateId:string | null,
   currentOperateNode: WorkFlowNode|null,
   setCurrentOperateId:(id:string)=>void,
   setCurrentOperateNode:(node:WorkFlowNode)=>void
}

export const createWorkflowStatusState:StateCreator<WorkFlowStatus> = (set) => ({
  currentOperateId: null,
  currentOperateNode: null,
  setCurrentOperateId: (id:string) => set({ currentOperateId: id }),
  setCurrentOperateNode: (node:WorkFlowNode) => set({ currentOperateNode: node }),
});
