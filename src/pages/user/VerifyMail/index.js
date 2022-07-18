import React, { useEffect, useState } from 'react';
import { history, connect, Link } from 'umi';
import { createStructuredSelector } from 'reselect';
import { Spin, Form, Button, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { doVerifyMailAction } from '@/stores/auth/actions';
import { selMessageVerifyMail } from '@/stores/auth/selectors';
import { selectorLoading } from '@/stores/loading/selector';
import { NS_AUTH, DO_REGISTER } from '@/stores/auth/constants';

import { isEmpty } from '@/utils/utils';

import styles from './index.less';
import TitleForm from '../components/TitleForm';

const VerifyMail = (props) => {
  const {} = props;

  const [isResend, setIsResend] = useState(false);

  const onClickResend = () => {
    setIsResend(true);
  };

  const handleSubmitVerfiySecond = async (values) => {
    console.log('values', values);
  };

  return (
    <>
      <TitleForm title="" />
      <div className={styles.wrapInfoVerifyMail}>
        {/* {isLoading && (
          <div className={styles.wrapLoader}>
            <div className={styles.loader}>
              <Spin />
            </div>
          </div>
        )} */}
        {isResend ? (
          <Form
            name="resendEmailForm"
            onFinish={handleSubmitVerfiySecond}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item name="code" rules={[{ required: true, message: 'Please input your code!' }]}>
              <Input placeholder="Code" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              // loading={isLoading}
              // disabled={isLoading}
            >
              Verify
            </Button>
          </Form>
        ) : (
          <>
            <FontAwesomeIcon icon={faEnvelopeOpen} size="8x" color="#ffbd2f" />
            <p className={styles.goToLogin}>Please check your email and confirm register</p>
            <p style={{ marginBottom: 0, fontSize: 12 }}>
              <span>
                If you haven't received the email yet{' '}
                <a onClick={() => onClickResend()}>Resend mail</a>
              </span>
            </p>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  // isLoading: selectorLoading(`${NS_AUTH}/${DO_REGISTER}`),
  // messageVerifyMail: selMessageVerifyMail,
});

const mapDispatchToProps = (dispatch) => ({
  // doVerifyMailispatch: (payload) => dispatch(doVerifyMailAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyMail);
