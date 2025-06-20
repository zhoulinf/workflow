/*
   meta data 内容主要是一些拓展数据，不触发页面更新，手动调用获取

*/

import type { StateCreator } from 'zustand';

export type WorkFlowMetaState = {
  metaData: Map<string, object>,
  clear:()=>void,
  setMetaData: (id:string, data:object)=>void
  deleteMetaData:(id:string)=>void
}

export const createWorkflowMetaState:StateCreator<WorkFlowMetaState> = (_, get) => ({
  metaData: new Map(),
  setMetaData: (id:string, data:object) => get().metaData.set(id, data),
  deleteMetaData: (id:string) => get().metaData.delete(id),
  clear: () => () => get().metaData.clear(),
});
