import React from 'react';
import ETHSource from '@/assets/icons/eth.png';
import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import PriceVolatility from '../PriceVolatility';
import styles from './index.less';

const GweiContent = () => (
  <div className={styles.gweiContent}>
    <p>Base fee: 72 Gwei</p>
    <p>Priority fee: 2 Gwei</p>
  </div>
);

const Coin = (props) => {
  return (
    <div className={styles.coinContainer}>
      <img src={ETHSource} alt="eth-icon" />

      <div className={styles.wrapCoin}>
        <p>
          Eth <PriceVolatility />
        </p>
        <span className={styles.coinContent}>
          <Tooltip color="#835205" title="Changes in the last 24 hours">
            (= $3123.4)
          </Tooltip>{' '}
          <span className={styles.gwei}>
            |{' '}
            <Tooltip color="#835205" title={<GweiContent />}>
              <FontAwesomeIcon size="1x" icon={faGasPump} /> 74 Gwei
            </Tooltip>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Coin;
