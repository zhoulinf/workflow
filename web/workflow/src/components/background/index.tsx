import { Background as BaseBackGround, BackgroundVariant } from '@xyflow/react';

const Background = () => (
  <>
    <BaseBackGround id="background_1" variant={BackgroundVariant.Lines} gap={100} lineWidth={1} color="black" />
    <BaseBackGround id="background_2" variant={BackgroundVariant.Lines} gap={10} lineWidth={0.5} color="#404040" />
  </>
);

export { Background };
