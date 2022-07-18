import React, { memo, useState } from 'react';
import { useSelector, connect } from 'umi';
import { Tabs } from 'antd';
import { createStructuredSelector } from 'reselect';
import { QrcodeOutlined, UserOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ChangeProfile from './components/ChangeProfile';
import ChangePassword from './components/ChangePassword';
import TwoFactorAuthentication from './components/TwoFactorAuthentication';

import {
  getQrCodeAction,
  verify2FACodeAction,
  disableTFAAction,
  changePasswordAction,
} from '@/stores/auth/actions';
import { seltwoAuthData, selCurrentUser } from '@/stores/auth/selectors';
import {
  GET_QR_CODE,
  NS_AUTH,
  VERIFY_2FA_CODE,
  DISABLE_2FA,
  CHANGE_PASSWORD,
} from '@/stores/auth/constants';

import { selectorLoading } from '@/stores/loading/selector';

import styles from './styles.less';

const { TabPane } = Tabs;

const Profile = (props) => {
  const currentUser = useSelector(selCurrentUser);
  const [activeKey, setActiveKey] = useState('1');

  const {
    qrCodeData,
    isLoadingGetQrCode,
    isLoadingVerify2FACode,
    isLoadingDisable2FA,
    isLoadingChangePassword,
  } = props;
  const { verify2FACodeDispatch, getQrCodeDispatch, disableTFADispatch, changePasswordDispatch } =
    props;
  return (
    <div className={styles.profileContainer}>
      <Tabs animated activeKey={activeKey} onChange={(key) => setActiveKey(key)}>
        <TabPane
          key="1"
          tab={
            <span>
              <UserOutlined />
              My profile
            </span>
          }
        >
          <ChangeProfile currentUser={currentUser} />
        </TabPane>
        <TabPane
          key="2"
          tab={
            <span>
              <EyeInvisibleOutlined />
              Password
            </span>
          }
        >
          <ChangePassword
            activeKey={activeKey}
            onChangePassword={changePasswordDispatch}
            isLoading={isLoadingChangePassword}
          />
        </TabPane>
        <TabPane
          key="3"
          tab={
            <span>
              <QrcodeOutlined />
              Two-factor authentication
            </span>
          }
        >
          <TwoFactorAuthentication
            qrCodeData={qrCodeData}
            getQrCode={getQrCodeDispatch}
            isLoadingGetQrCode={isLoadingGetQrCode}
            isLoadingVerify2FACode={isLoadingVerify2FACode}
            verify2FACode={verify2FACodeDispatch}
            isLoadingDisable2FA={isLoadingDisable2FA}
            disableTFADispatch={disableTFADispatch}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  qrCodeData: seltwoAuthData,
  isLoadingGetQrCode: selectorLoading(`${NS_AUTH}/${GET_QR_CODE}`),
  isLoadingVerify2FACode: selectorLoading(`${NS_AUTH}/${VERIFY_2FA_CODE}`),
  isLoadingDisable2FA: selectorLoading(`${NS_AUTH}/${DISABLE_2FA}`),
  isLoadingChangePassword: selectorLoading(`${NS_AUTH}/${CHANGE_PASSWORD}`),
});

const mapDispatchToProps = (dispatch) => ({
  getQrCodeDispatch: () => dispatch(getQrCodeAction()),
  verify2FACodeDispatch: (payload) => dispatch(verify2FACodeAction(payload)),
  disableTFADispatch: (payload) => dispatch(disableTFAAction(payload)),
  changePasswordDispatch: (payload) => dispatch(changePasswordAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
