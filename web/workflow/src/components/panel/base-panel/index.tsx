import React, { HTMLAttributes } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import styles from './index.module.scss';

type PanelProps = HTMLAttributes<HTMLDivElement>
type PanelHeaderProps = PanelProps & {
  children:React.ReactNode
}
type PanelContentProps = PanelProps
const Panel = (props:PanelProps) => {
  const { className, ...restProps } = props;
  return <div className={`${styles.content} ${className}`} {...restProps} />;
};

const PanelHeader = (props:PanelHeaderProps) => {
  const { children, className, ...restProps } = props;
  return (
    <div className={`${styles.header} ${className}`} {...restProps}>
      {children}
      <Cross1Icon className={styles.close} />
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
