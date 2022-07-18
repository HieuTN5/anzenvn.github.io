import React from 'react';
import { Link } from 'umi';
import styles from './styles.less';
import RenderIcon from '../RenderIcon';

export default function MenuItemRender(props) {
  const { name, path, icon, defaultDom, iconName, collapsed } = props;
  return (
    <Link to={path} className={styles.menuItemLink}>
      <RenderIcon iconName={iconName} collapsed={collapsed} />
      {defaultDom}
    </Link>
  );
}
