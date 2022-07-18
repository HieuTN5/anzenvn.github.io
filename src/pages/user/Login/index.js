import React, { useState, useEffect } from 'react';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import { connect, getDvaApp, history, useModel } from 'umi';
import { Form, Input, Button, Checkbox } from 'antd';
import { doLoginAction } from '@/stores/auth/actions';
import { createStructuredSelector } from 'reselect';
import { selectorLoading } from '@/stores/loading/selector';
import { NS_AUTH, DO_LOGIN } from '@/stores/auth/constants';
import { selAutoFillUsername } from '@/stores/auth/selectors';
import {
  setCookie,
  getCookie,
} from '@/utils/utils';
import { saveUserProfile } from '@/stores/auth/actions';
import {
  authenticateService,
  getProfileService
} from '@/services/auth';
import { handleGetProfile } from '@/stores/auth/effects';
import styles from './index.less';
import TitleForm from '../components/TitleForm';
import { COOKIE_NAMES } from '@/utils/constants';
const LOGIN_STEP = {
  LOGIN: '1',
  VERIFY_2FA: '2',
};

const { TabPane } = Tabs;
const saveToken = (payload) => {
  const { access_token, refresh_token, userName } = payload;
  console.log(payload)
  if (access_token) {
    setCookie(COOKIE_NAMES.ID_TOKEN, access_token, 1);
  }
  if (refresh_token) {
    setCookie(COOKIE_NAMES.REFRESH_TOKEN, refresh_token, 1);
  }

  if (userName) {
    setCookie(COOKIE_NAMES.USERNAME, userName, 1);
  }
};

const Login = (props) => {
  const { doLoginDispatch, isLoading, autoFillUsername } = props;
  const { initialState, setInitialState } = useModel('@@initialState');
  const [stepLogin, setStepLogin] = useState(LOGIN_STEP.LOGIN);
  const [loading, setIsloading] = useState(false);
  const [form] = Form.useForm();
  const saveInfoUser = (payload) => {
    const { email, fullName, userName, role } = payload;
    if (role) {
      setCookie(COOKIE_NAMES.USER_ROLE, role, 1);
    }
    if (userName) {
      setCookie(COOKIE_NAMES.USERNAME, userName, 1);
    }
    if (userName) {
      setCookie(COOKIE_NAMES.FULLNAME, fullName, 1);
    }
    if (userName) {
      setCookie(COOKIE_NAMES.EMAIL, email, 1);
    }
  }
  const handleSubmit = async (values) => {

    try {
      const params = {
        password: 'P@ssw0rd',
        userName: 'admin',
      };
      setIsloading(true)
      const msg = await authenticateService({ ...params });
      saveToken(msg)
      if (msg?.access_token) {
        const currentUser = await getProfileService();
        if (currentUser.result) {
          saveInfoUser(currentUser.result)
          await setInitialState((s) => ({ ...s, currentUser: currentUser.result }));
          setTimeout(() => {
            const { dispatch } = getDvaApp()?._store;
            dispatch(saveUserProfile(currentUser.result));
          });
          if (!history) return;
          const { query } = history.location;
          const { redirect } = query;
          history.push(redirect || '/');
          return;
        }
      }
      setIsloading(false)
    } catch (error) {
      console.log(error)
    }
    // doLoginDispatch({ values });
  };

  const onChangeLoginStep = (step) => {
    setStepLogin(step);
    console.log(step);
  };

  useEffect(() => {
    form.setFieldsValue({ userName: autoFillUsername });
  }, [autoFillUsername, form]);

  return (
    <>
      <TitleForm title="Login" />
      <Form
        name="basic"
        // initialValues={{ userName: 'testregister', password: '123123' }}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        size="large"
        form={form}
      >
        <div className={styles.loginContent}>
          <Tabs animated activeKey={stepLogin} onChange={(key) => setStepLogin(key)}>
            <TabPane key={LOGIN_STEP.LOGIN}>
              <>
                <Form.Item
                  name="userName"
                  rules={[{ required: true, message: 'Please input your userName!' }]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" className={styles.inputPassword} />
                </Form.Item>
                {/* <div className={styles.forgotBlock}>
                  <Link to="/user/forgot-password">Forgot password?</Link>
                </div> */}
                <div className={styles.bottomGroup}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={(styles.btnCus, styles.loginButton)}
                    loading={loading}
                  >
                    Login
                  </Button>
                  {/* <Button
                    type="ghost"
                    onClick={() => history.push('/user/register')}
                    // onClick={() => onChangeLoginStep(LOGIN_STEP.VERIFY_2FA)}
                    className={[styles.btnCus, styles.regButton]}
                  >
                    Create account
                  </Button> */}
                </div>
              </>
            </TabPane>
          </Tabs>
          <div className={styles.regBlock}>
            <span>
              Website giới thiệu của
              <a style={{ paddingLeft: 10 }} href="https://vantaianzen.vn/">
                ANZEN vận tải
              </a>
            </span>
          </div>
        </div>
      </Form>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectorLoading(`${NS_AUTH}/${DO_LOGIN}`),
  autoFillUsername: selAutoFillUsername,
});

const mapDispatchToProps = (dispatch) => ({
  doLoginDispatch: (payload) => dispatch(doLoginAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
