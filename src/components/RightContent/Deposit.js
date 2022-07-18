import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import DepositModal from '../DepositModal';
import useWindowDimensions from '@/utils/windowDimessions';
import { DollarCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

const Deposit = () => {
  const [isOpenDeposit, setOpenDeposit] = useState(false);
  const { width } = useWindowDimensions();
  return (
    <>
      {width > 576 ? (
        <Button
          type="primary"
          size="large"
          className={styles.depositBtn}
          onClick={() => setOpenDeposit(true)}
        >
          Logout
        </Button>
      ) : (
        <Button
          type="primary"
          className={styles.depositBtn}
          onClick={() => setOpenDeposit(true)}
          shape="circle"
          icon={<DollarCircleOutlined />}
        >
          {/* Deposit */}
        </Button>
      )}

      <DepositModal isVisible={isOpenDeposit} setVisible={setOpenDeposit} />
    </>
  );
};

export default Deposit;
