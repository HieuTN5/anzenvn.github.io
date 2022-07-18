import React, { memo } from 'react';
import { Button } from 'antd';
import { Link, history } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHistory, faBezierCurve } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles.less';

const Welcome = (props) => {
  const { currentUserBetInfo } = props;
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <h2>Dashboard</h2>
        <p>
          Welcome aboard, <span>thangcon</span>
        </p>
      </div>
      <div></div>
      <div className={styles.welcomeBar}>
        <div className={styles.infoBlock}>
          <FontAwesomeIcon icon={faStar} size="lg" color="#ffbd2f" />
          <span> Vip ({currentUserBetInfo.level}) </span>
        </div>
        <div className={styles.infoBlock} onClick={() => history.push('/affiliates')}>
          <FontAwesomeIcon icon={faBezierCurve} size="lg" color="#ffbd2f" />
          <Link to="/affiliates"> Affiliates ({currentUserBetInfo.totalChild})</Link>
        </div>
        <div className={styles.infoBlock} onClick={() => history.push('/history/transfer')}>
          <FontAwesomeIcon icon={faHistory} size="lg" color="#ffbd2f" />
          <Link to="/history/transfer"> Transactions</Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Welcome);
