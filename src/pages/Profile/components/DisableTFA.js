import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Typography, Form, Button, Input, Card, Spin, Tabs } from 'antd';
import Qrcode from 'qrcode.react';
import { getCookie } from '@/utils/utils';
import { COOKIE_NAMES } from '@/utils/constants';
import styles from '../styles.less';
const { Text, Link: TypeLink, Title } = Typography;

const DISABLE_TFA_STEP = {
  INTRO: '1',
  VERIFY_CODE: '2',
};

const { TabPane } = Tabs;

const DisableTFA = (props) => {
  const { onDisable2fa, isLoadingDisable2FA } = props;

  const [stepDisable, setStepDisable] = useState(DISABLE_TFA_STEP.INTRO);
  return (
    <>
      <Card>
        <Tabs activeKey={stepDisable}>
          <TabPane key={DISABLE_TFA_STEP.INTRO}>
            <Title level={3}>Two-factor authentication is enabled.</Title>
            <Typography>
              If you turn off two-factor authentication, your account will be protected with only
              your password.
            </Typography>
            <Button
              type="primary"
              size="large"
              danger
              onClick={() => setStepDisable(DISABLE_TFA_STEP.VERIFY_CODE)}
            >
              Disable Two-factor authentication
            </Button>
          </TabPane>
          <TabPane key={DISABLE_TFA_STEP.VERIFY_CODE}>
            <Title level={3}>Disable Two-factor authentication</Title>
            <Typography>
              If you turn off two-factor authentication, your account will be protected with only
              your password.
            </Typography>
            <Form name="verifyCode2FA" onFinish={onDisable2fa}>
              <Form.Item
                name="twoFactorCode"
                rules={[
                  {
                    required: true,
                    message: 'Please input Verification Code',
                  },
                ]}
              >
                <Input placeholder="Two-factor authentication code" />
              </Form.Item>
              <Form.Item>
                <div className={styles.taCenter}>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={isLoadingDisable2FA}
                  >
                    Disable
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default DisableTFA;
