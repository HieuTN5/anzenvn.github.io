import React from 'react';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHistory, faBezierCurve } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles.less';

const Information = () => {
  return (
    <div className={styles.mb48}>
      <h2 className={styles.titleInfo}>Informations</h2>
      <Card>
        <div className={styles.informationTab}>
          <div>
            <FontAwesomeIcon icon={faStar} color="#ffbd2f" size="lg" />
          </div>
          <div className={styles.betInfo}>
            <h3> Vip(1)</h3>
          </div>
        </div>
        <div className={styles.informationTab}>
          <div>
            <FontAwesomeIcon icon={faHistory} color="#ffbd2f" size="lg" />
          </div>
          <div className={styles.betInfo}>
            <h3>View all your transactions</h3>
          </div>
        </div>
        <div className={styles.informationTab}>
          <div>
            <FontAwesomeIcon icon={faBezierCurve} color="#ffbd2f" size="lg" />
          </div>
          <div className={styles.betInfo}>
            <h3>View affiliates</h3>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Information;
