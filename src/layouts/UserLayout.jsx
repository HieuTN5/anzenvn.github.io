import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, history } from 'umi';
import { createStructuredSelector } from 'reselect';

import { getCookie, isEmpty } from '@/utils/utils';
import { COOKIE_NAMES } from '@/utils/constants';

import { selectorLoading } from '@/stores/loading/selector';
import { NS_AUTH, GET_USER_PROFILE } from '@/stores/auth/constants';
import { getUserProfile, getUserIpAddress } from '@/stores/auth/actions';
import { selCurrentUser } from '@/stores/auth/selectors';

import styles from './userLayout.less';

const UserLayout = (props) => {
  const {
    children,
    title,
    userProfile,
    getUserProfileDispatch,
    // isLoadingGlobal,
    routes,
    getUserIpAddressDispatch,
  } = props;
  useEffect(() => {
    const idToken = getCookie(COOKIE_NAMES.ID_TOKEN);
    const userName = getCookie(COOKIE_NAMES.USERNAME);

    if (!isEmpty(idToken) && !isEmpty(userName)) {
      getUserProfileDispatch();
    }
    getUserIpAddressDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEmpty(userProfile)) return;
    history.push('/');
  }, [userProfile]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>{children}</div>
      </div>
    </div>
  );
};

UserLayout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  // isLoadingGlobal: selectorLoading(`${NS_AUTH}/${GET_USER_PROFILE}`),
  userProfile: selCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfileDispatch: (payload) => dispatch(getUserProfile(payload)),
  getUserIpAddressDispatch: () => dispatch(getUserIpAddress()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLayout);
