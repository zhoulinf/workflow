import { Position } from '@xyflow/react';
import { CUSTOM_SIMPLE_NODE } from '@/constant';
import type { NodeData } from '../store/node-slice';

// 先简单这样计算

interface LastPosition{
  x:number;
  y:number;
}
export const computePosition = (lastPosition?:LastPosition) => {
  if (!lastPosition) {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  }
  return {
    x: lastPosition.x + 250,
    y: lastPosition.y,
  };
};

/**
 * @description 生成一个默认的简单Node
 * @param {NodeData} data
 * @returns {Node} 生成的Node对象
 */
export const generateSimpleNode = (data:NodeData, lastPosition?:LastPosition) => {
  const position = computePosition(lastPosition);
  return {
    id: `http${Date.now()}`,
    type: CUSTOM_SIMPLE_NODE,
    data,
    position: computePosition(position),
    targetPosition: Position.Right,
    sourcePosition: Position.Left,
  };
};
