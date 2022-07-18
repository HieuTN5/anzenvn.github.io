import { Button } from 'antd';
import React from 'react';
import { Link, history } from 'umi';
import styles from './index.less';

export default function Signup() {
  return (
    <div className={styles.signupContent}>
      <Link to="/user/login">Login</Link>
      <Button
        type="primary"
        className={styles.buttonSignupWrap}
        onClick={() => history.push('/user/register')}
      >
        Sign up
      </Button>
    </div>
  );
}
