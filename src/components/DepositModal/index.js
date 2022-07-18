import React, { useEffect, memo } from 'react';
import { Button, Modal, Alert, message, Spin } from 'antd';
import Qrcode from 'qrcode.react';

import bgQr from '@/assets/images/bg-qr.svg';
import logo from '@/assets/images/logo.png';
import styles from './styles.less';

const DepositModal = (props) => {
  const { isVisible, setVisible, isLoadingDepositAddress, userWallet = {} } = props;

  const onCopyQrText = (e) => {
    e.preventDefault();
    var textField = document.createElement('textarea');
    textField.innerText = userWallet.erc20;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    message.success('Address copied');
  };

  return (
    <Modal visible={isVisible} onCancel={() => setVisible(false)} width={672} footer={null}>
      <div className={styles.qrContainer}>
        <p className={styles.titleContainer}>DEPOSIT ETH (ERC20)</p>
        <p>This deposit address only accepts ETH (ERC20)</p>
        <div className={styles.qrCodeWrap}>
          {/* <div className={styles.wrapLogo}>
            <img src={logo} alt="" />
            <div>ANZEN</div>
          </div> */}
          <div className={styles.qrCode}>
            <Spin spinning={isLoadingDepositAddress}>
              <Qrcode value={userWallet.erc20} />
            </Spin>
          </div>
          <div className={styles.qrBg}>
            <img src={bgQr} alt="" />
          </div>
          <p>{userWallet.erc20}</p>
        </div>
        <div className={styles.qrQrText} onClick={(e) => onCopyQrText(e)}>
          <Button type="primary">Copy</Button>
        </div>
      </div>
      <div className={styles.alertDeposit}>
        <Alert
          message={<p>Minimum deposit amount</p>}
          description={
            <div>
              <span>Deposit min 0.02 ETH. </span>
              <span>
                Please double check your wallet address before deposit. When you deposit you need 15
                confirmations from wallet
              </span>
            </div>
          }
          type="warning"
          showIcon
        />
      </div>
    </Modal>
  );
};

export default memo(DepositModal);
