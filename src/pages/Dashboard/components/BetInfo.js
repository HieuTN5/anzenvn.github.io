import React from 'react';
import { Card, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import SignalRComponent from '@/components/SignalR';
import styles from '../styles.less';

const BetInfo = (props) => {
  const { onOpenDeposit, onOpenTransfer, onOpenWithdraw, currentUserBetInfo } = props;
  return (
    <div className={styles.mb48}>
      <h2 className={styles.titleInfo}>Funds</h2>
      <Card>
        <div className={[styles.betInfoContainer]}>
          <div>
            <FontAwesomeIcon icon={faMoneyCheckAlt} color="#ffbd2f" size="2x" />
          </div>
          <div className={styles.betInfo}>
            <h3>{currentUserBetInfo.balance} BET</h3>
            <p>(~0.0000 ETH)</p>
            <p>1ETH = $3123.4</p>
          </div>
          <div className={styles.actionBar}>
            <Button type="primary" size="large" onClick={onOpenDeposit}>
              Deposit
            </Button>
            <Button type="primary" size="large" onClick={onOpenTransfer}>
              Transfer
            </Button>
            <Button type="primary" size="large" onClick={onOpenWithdraw}>
              Withdraw
            </Button>
          </div>
        </div>
      </Card>
      {/* <SignalRComponent /> */}
    </div>
  );
};

export default BetInfo;
