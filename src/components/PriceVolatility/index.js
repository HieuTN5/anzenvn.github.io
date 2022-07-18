import React from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { COIN_STATUS } from '@/utils/constants';
import PropTypes from 'prop-types';
import styles from './styles.less';

const PriceVolatility = (props) => {
  const { value, status } = props;
  const classname = status === COIN_STATUS.UP ? styles.up : styles.down;
  return (
    <span className={styles.wrapPriceVolatility}>
      <span className={classname}>
        (<ArrowDownOutlined /> 0.14%)
      </span>
    </span>
  );
};

PriceVolatility.propTypes = {
  status: PropTypes.string,
  value: PropTypes.string,
};

export default PriceVolatility;
