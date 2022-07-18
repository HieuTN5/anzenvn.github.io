import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Avatar } from 'antd';
import { history, useModel, connect } from 'umi';
import { logOutAction } from '@/stores/auth/actions';
import { addCommaThousand } from '@/utils/utils';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const AvatarDropdown = ({ logOut, currentUser }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;

      if (key === 'logout') {
        setInitialState({ ...initialState, currentUser: undefined });
        logOut();
        return;
      }

      history.push(`/${key}`);
    },
    [initialState, setInitialState, logOut],
  );

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {/* <Menu.Item key="profile">
        <UserOutlined />
        My profile
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        Settings
      </Menu.Item>
      <Menu.Divider /> */}
      <Menu.Item key="logout">
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <div className={styles.wrapAccount}>
        <UserOutlined style={{ fontSize: '110%' }} />
        <span style={{ fontSize: 16 }}>
          <b>{currentUser.userName}</b>
        </span>
      </div>
    </HeaderDropdown>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logOut: (payload) => dispatch(logOutAction(payload)),
});

export default connect(null, mapDispatchToProps)(AvatarDropdown);
