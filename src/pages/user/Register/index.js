import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { Form, Input, Button } from 'antd';
import { doRegisterAction } from '@/stores/auth/actions';
import { createStructuredSelector } from 'reselect';
import { selectorLoading } from '@/stores/loading/selector';
import { REGEX } from '@/utils/constants';
import { isEmpty } from '@/utils/utils';
import { NS_AUTH, DO_REGISTER } from '@/stores/auth/constants';
import styles from './index.less';
import TitleForm from '../components/TitleForm';

const Register = (props) => {
  const {
    doRegisterDispatch,
    isLoading,
    location: { query = {} },
  } = props;

  const [form] = Form.useForm();

  const isHaveParent = !isEmpty(query?.parent);

  const handleSubmit = async (values) => {
    const callback = () => {
      form.resetFields();
    };
    await doRegisterDispatch({ values, callback });
  };

  useEffect(() => {
    if (!isEmpty(query?.parent)) {
      form.setFieldsValue({ parent: query.parent });
    }
  }, [query, form]);

  return (
    <>
      <TitleForm title="Sign up" />
      <Form
        name="register"
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        size="large"
      >
        <div className={styles.registerContent}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
            validateTrigger={['onBlur']}
          >
            <Input placeholder="Your email" maxLength={100} />
          </Form.Item>
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: 'Please input your userName!',
              },
            ]}
          >
            <Input placeholder="Your userName" maxLength={20} />
          </Form.Item>
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
            <Input.Password placeholder="Your password" className={styles.inputPassword} />
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
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" className={styles.inputPassword} />
          </Form.Item>
          <Form.Item
            name="parent"
            rules={[{ required: true, message: 'Please input Affiliate ID!' }]}
          >
            <Input placeholder="Affiliate ID" disabled={isHaveParent} />
          </Form.Item>

          <div className={styles.bottomGroup}>
            <Button
              loading={isLoading}
              htmlType="submit"
              type="primary"
              className={[styles.btnCus, styles.regButton]}
            >
              Create account
            </Button>
            <div className={styles.loginBlock}>
              <span>
                Already have an account?
                <Link to="/user/login"> Log in</Link>
              </span>
            </div>
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
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectorLoading(`${NS_AUTH}/${DO_REGISTER}`),
});

const mapDispatchToProps = (dispatch) => ({
  doRegisterDispatch: (payload) => dispatch(doRegisterAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
