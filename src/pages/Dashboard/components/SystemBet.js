import React, { memo } from 'react';
import { Card, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { addCommaThousand } from '@/utils/utils';
import styles from '../styles.less';

const SystemBet = (props) => {
  const { currentUserBetInfo } = props;

  return (
    <div className={styles.mb48}>
      <h2 className={styles.titleInfo}>System Bets</h2>
      <Card>
        <div className={styles.myBetInfoContainer}>
          <div>
            <FontAwesomeIcon icon={faMoneyBill} color="#ffbd2f" size="2x" />
          </div>
          <div className={styles.betInfo}>
            <h3>{addCommaThousand(currentUserBetInfo.systemBet)} BET</h3>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default memo(SystemBet);
