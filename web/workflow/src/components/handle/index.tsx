import { Handle as BaseHandle, HandleProps } from '@xyflow/react';
import { PlusIcon } from '@radix-ui/react-icons';

import styles from './index.module.scss';

const Handle = (props: HandleProps) => {
  const { className, ...restProps } = props;

  return (
    <BaseHandle
      className={`${styles.handle} ${className}`}
      {...restProps}
    >
      <PlusIcon />
    </BaseHandle>
  );
};

export {
  Handle,
};
