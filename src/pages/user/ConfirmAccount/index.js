import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { createStructuredSelector } from 'reselect';
import { Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { doVerifyMailAction } from '@/stores/auth/actions';
import { selMessageVerifyMail } from '@/stores/auth/selectors';
import { selectorLoading } from '@/stores/loading/selector';
import { NS_AUTH, VERIFY_MAIL } from '@/stores/auth/constants';
import UserLayout from '@/layouts/UserLayout';

import { isEmpty } from '@/utils/utils';

import styles from './index.less';
import TitleForm from '../components/TitleForm';

const ConfirmAccount = (props) => {
  const {
    doVerifyMailispatch,
    isLoading,
    messageVerifyMail,
    location: { query = {} },
  } = props;

  useEffect(() => {
    if (!isEmpty(query?.token)) {
      doVerifyMailispatch({ token: query?.token });
    }
  }, [query]);

  return (
    <UserLayout>
      <TitleForm title="" />
      <div className={styles.wrapInfoVerifyMail}>
        {isLoading && (
          <div className={styles.wrapLoader}>
            <div className={styles.loader}>
              <Spin />
            </div>
          </div>
        )}
        <FontAwesomeIcon icon={faEnvelopeOpen} size="8x" color="#ffbd2f" />
        {!isEmpty(messageVerifyMail) && (
          <>
            <p className={styles.goToLogin}>{messageVerifyMail}</p>
            <p style={{ marginBottom: 0 }}>
              <Link to="/user/login">Go To Login</Link>
            </p>
          </>
        )}
      </div>
    </UserLayout>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectorLoading(`${NS_AUTH}/${VERIFY_MAIL}`),
  messageVerifyMail: selMessageVerifyMail,
});

const mapDispatchToProps = (dispatch) => ({
  doVerifyMailispatch: (payload) => dispatch(doVerifyMailAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccount);
