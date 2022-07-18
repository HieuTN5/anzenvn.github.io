import { Space, Button, Spin } from 'antd';

import React, { useEffect } from 'react';
import { useModel, useSelector } from 'umi';

import { selCurrentUser } from '@/stores/auth/selectors';
import { selectorLoading } from '@/stores/loading/selector';
import { NS_AUTH, GET_USER_PROFILE } from '@/stores/auth/constants';

import Avatar from './AvatarDropdown';
import Signup from './Signup';
import Deposit from './Deposit';
import Coin from './Coin';
import styles from './index.less';

const GlobalHeaderRight = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = useSelector(selCurrentUser);
  const isLoading = useSelector(selectorLoading(`${NS_AUTH}/${GET_USER_PROFILE}`));
  useEffect(() => {
    console.log(currentUser)
    if (currentUser?.userName && !initialState?.currentUser?.userName) {
      setInitialState({ ...initialState, currentUser });
    }
  }, [initialState, currentUser, setInitialState]);

  if (isLoading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  // if ((currentUser && !currentUser?.userName) || !initialState.currentUser?.userName) {
  //   return <Signup />;
  // }

  return (
    <Space className={styles.right}>
      {/* <Coin /> */}
      <Avatar currentUser={currentUser} />
    </Space>
  );
};

export default GlobalHeaderRight;
