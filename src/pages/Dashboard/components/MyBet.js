import React, { memo } from 'react';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDonate } from '@fortawesome/free-solid-svg-icons';
import { addCommaThousand } from '@/utils/utils';
import styles from '../styles.less';

const MyBet = (props) => {
  const { currentUserBetInfo } = props;
  return (
    <div className={styles.mb48}>
      <h2 className={styles.titleInfo}>My Bets</h2>
      <Card>
        <div className={styles.myBetInfoContainer}>
          <div>
            <FontAwesomeIcon icon={faDonate} color="#ffbd2f" size="2x" />
          </div>
          <div className={styles.betInfo}>
            <h3>{addCommaThousand(currentUserBetInfo.userBet)} BET</h3>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default memo(MyBet);
