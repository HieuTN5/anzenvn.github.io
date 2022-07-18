import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Typography, Form, Button, Input, Card, Spin } from 'antd';
import Qrcode from 'qrcode.react';
import { getCookie } from '@/utils/utils';
import { COOKIE_NAMES } from '@/utils/constants';
import DisableTFA from './DisableTFA';
import styles from '../styles.less';
const { Text, Link: TypeLink, Title } = Typography;

const STEP = {
  INTO: 1,
  IMPLEMENT: 2,
};

const TwoFactorAuthentication = (props) => {
  const [state, setstate] = useState(STEP.INTO);
  const [isUsing2FA, setIsUsing2FA] = useState(false);
  const {
    getQrCode,
    qrCodeData,
    isLoadingGetQrCode,
    verify2FACode,
    isLoadingVerify2FACode,
    isLoadingDisable2FA,
    disableTFADispatch,
  } = props;

  useEffect(() => {
    const using2fa = JSON.parse(getCookie(COOKIE_NAMES.USING_2FA));
    if (using2fa) {
      setIsUsing2FA(true);
    } else {
      setIsUsing2FA(false);
      getQrCode();
    }
  }, [getQrCode]);

  const onVerify2faCode = (values) => {
    verify2FACode(values);
  };

  const onDisable2fa = (values) => {
    const callback = () => setIsUsing2FA(false);
    disableTFADispatch({ values, callback });
  };

  return (
    <>
      <div className={styles.tfaContainer}>
        <div />
        <div>
          {isUsing2FA && (
            <DisableTFA onDisable2fa={onDisable2fa} isLoadingDisable2FA={isLoadingDisable2FA} />
          )}
          {!isUsing2FA && (
            <Card>
              <Typography>
                1. Download a two-factor authenticator app like Microsoft Authenticator for{' '}
                <TypeLink href="https://go.microsoft.com/fwlink/?Linkid=825071" target="_blank">
                  Windows Phone
                </TypeLink>
                ,{' '}
                <TypeLink href="https://go.microsoft.com/fwlink/?Linkid=825072" target="_blank">
                  Android
                </TypeLink>{' '}
                and{' '}
                <TypeLink href="https://go.microsoft.com/fwlink/?Linkid=825073" target="_blank">
                  IOS
                </TypeLink>{' '}
                or Google Authenticator for{' '}
                <TypeLink
                  href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en"
                  target="_blank"
                >
                  Android
                </TypeLink>{' '}
                and{' '}
                <TypeLink
                  href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"
                  target="_blank"
                >
                  IOS
                </TypeLink>
                .
              </Typography>
              <Typography>
                2. Scan the QR Code or enter this key as below <br />{' '}
                <Text code>{qrCodeData.sharedKey}</Text> into your two factor authenticator app.
                Spaces and casing do not matter.
                <div className={styles.qrCode}>
                  <Spin spinning={isLoadingGetQrCode}>
                    <Qrcode value={qrCodeData?.authenticatorUri} level="H" size={186} />
                  </Spin>
                </div>
              </Typography>

              <Typography>
                3. Once you have scanned the QR code or input the key above, your two factor
                authentication app will provide you with a unique code. Enter the code in the
                confirmation box below.
              </Typography>
              <Form name="verifyCode2FA" onFinish={onVerify2faCode}>
                <Form.Item
                  name="twoFactorCode"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Verification Code',
                    },
                  ]}
                >
                  <Input placeholder="Verification Code" />
                </Form.Item>
                <Form.Item>
                  <div className={styles.taCenter}>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      loading={isLoadingVerify2FACode}
                    >
                      Verify
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          )}
        </div>
        <div />
      </div>
    </>
  );
};

export default TwoFactorAuthentication;
