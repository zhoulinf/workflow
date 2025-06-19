// 先简单这样计算
export const computePosition = (lastPosition?:{x:number;y:number}) => {
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
