import React, { useEffect } from 'react';

import { notification } from 'antd';
import { connect, Link } from 'umi';
import { Form, Input, Button } from 'antd';
import { resetForgotPasswordAction } from '@/stores/auth/actions';
import { createStructuredSelector } from 'reselect';
import { selectorLoading } from '@/stores/loading/selector';
import { REGEX } from '@/utils/constants';
import { isEmpty } from '@/utils/utils';
import { NS_AUTH, RESET_FORGOT_PASSWORD } from '@/stores/auth/constants';
import UserLayout from '@/layouts/UserLayout';
import styles from './index.less';
import TitleForm from '../components/TitleForm';

const ForgotPassword = (props) => {
  const {
    resetPasswordDispatch,
    isLoading,
    location: { query = {} },
  } = props;

  const emptyToken = isEmpty(query?.token);

  const handleSubmit = async (data) => {
    const values = { ...data, token: query.token };
    resetPasswordDispatch({ values });
  };

  useEffect(() => {
    if (isEmpty(query?.token)) {
      notification.error({
        message: 'Please click on the link in the confirm email sent to your email ',
        duration: 0,
      });
    }
  }, [query]);

  return (
    <UserLayout>
      <TitleForm title="Reset password" />
      <Form
        name="resetPasswordForm"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        size="large"
      >
        <div className={styles.fotgotContent}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { max: 20, message: 'Password maximum 20 characters' },
              {
                pattern: REGEX.PASSWORD,
                message:
                  'Password must has at least 7 characters that include at least 1 lowercase character, 1 uppercase character, 1 number and not special characters',
              },
            ]}
          >
            <Input.Password
              placeholder="New password"
              className={styles.inputPassword}
              disabled={emptyToken}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please input confirm password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!'),
                  );
                  q;
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm pasword"
              className={styles.inputPassword}
              disabled={emptyToken}
            />
          </Form.Item>

          <div className={styles.bottomGroup}>
            <Button
              type="primary"
              htmlType="submit"
              className={(styles.btnCus, styles.regButton)}
              size="large"
              loading={isLoading}
              disabled={emptyToken}
            >
              Reset password
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
    </UserLayout>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectorLoading(`${NS_AUTH}/${RESET_FORGOT_PASSWORD}`),
});

const mapDispatchToProps = (dispatch) => ({
  resetPasswordDispatch: (payload) => dispatch(resetForgotPasswordAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
