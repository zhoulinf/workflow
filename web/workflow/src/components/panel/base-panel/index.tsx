import React, { HTMLAttributes } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useBaseNodeContext } from '@/components/nodes/base-node';
import styles from './index.module.scss';

type PanelProps = HTMLAttributes<HTMLDivElement>
type PanelHeaderProps = PanelProps & {
  children:React.ReactNode
}
type PanelContentProps = PanelProps

const Panel = (props:PanelProps) => {
  const { className, ...restProps } = props;
  return (
    <div className={`${styles.content} ${className}`} {...restProps} />
  );
};

const PanelHeader = (props:PanelHeaderProps) => {
  const { children, className, ...restProps } = props;
  const context = useBaseNodeContext();

  const handleClose = () => {
    context.setPanelOpen(false);
  };
  return (
    <div className={`${styles.header} ${className}`} {...restProps}>
      {children}
      <span className={styles.right}>
        <Cross1Icon className={styles.icon} onClick={handleClose} />
      </span>
    </div>
  );
};

const PanelContent = (props:PanelContentProps) => {
  const { className, ...restProps } = props;
  return (
    <div className={`${styles.content} ${className}`} {...restProps} />
  );
};

const Root = Panel;
const Header = PanelHeader;
const Content = PanelContent;

export {
  Root,
  Header,
  Content,
};
