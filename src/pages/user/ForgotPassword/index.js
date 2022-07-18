import React, { useState } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { connect, Link, history } from 'umi';
import { Form, Input, Button } from 'antd';
import { forgotPasswordAction } from '@/stores/auth/actions';
import { createStructuredSelector } from 'reselect';
import { selectorLoading } from '@/stores/loading/selector';
import { NS_AUTH, FORGOT_PASSWORD } from '@/stores/auth/constants';

import styles from './index.less';
import TitleForm from '../components/TitleForm';

const FORGOT_PASS_STEP = {
  FORGOT: 1,
  DONE: 2,
};

const { Title } = Typography;

const ResetPassword = (props) => {
  const { forgotPasswordDispatch, isLoading } = props;
  const [stepForgot, setstepForgot] = useState(FORGOT_PASS_STEP.FORGOT);
  const handleSubmit = async (values) => {
    const callback = () => setstepForgot(FORGOT_PASS_STEP.DONE);
    forgotPasswordDispatch({ values, callback });
  };

  return (
    <>
      {stepForgot === FORGOT_PASS_STEP.FORGOT && (
        <>
          <TitleForm
            title="Forgot password"
            subContent={stepForgot === FORGOT_PASS_STEP.DONE ? <></> : null}
          />
          <Form
            name="forgotPasswordForm"
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
            size="large"
          >
            <div className={styles.fotgotContent}>
              <Form.Item
                name="userName"
                rules={[{ required: true, message: 'Please input your userName!' }]}
              >
                <Input placeholder="Username" autoComplete="false" />
              </Form.Item>

              <div className={styles.bottomGroup}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={(styles.btnCus, styles.regButton)}
                  loading={isLoading}
                >
                  Send password reset email
                </Button>
              </div>

              <div className={styles.regBlock}>
                <span>
                  By signing up, you agree to ANZEN
                  <p>
                    <Link to="/">Terms and Conditions</Link> & <Link to="/">Privacy Policy</Link>
                  </p>
                </span>
              </div>
            </div>
          </Form>
        </>
      )}
      {stepForgot === FORGOT_PASS_STEP.DONE && (
        <>
          <div className={styles.sendMailSuccess}>
            <CheckCircleFilled />
            <Title level={3}>Submitted successfully</Title>
            <p>A confirm email will be sent to your mail box. Please check your email.</p>
            <Button
              type="primary"
              className={(styles.btnCus, styles.regButton)}
              loading={isLoading}
              onClick={() => history.push('/')}
            >
              Back to home
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectorLoading(`${NS_AUTH}/${FORGOT_PASSWORD}`),
});

const mapDispatchToProps = (dispatch) => ({
  forgotPasswordDispatch: (payload) => dispatch(forgotPasswordAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
