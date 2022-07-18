import React, { useState, memo, useEffect } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'umi';
import DepositModal from '@/components/DepositModal';
import TransferModal from '@/components/TransferModal';
import WithDrawModal from '@/components/WithDrawModal';
import PageContainer from '@/components/PageContainer';
import { createStructuredSelector } from 'reselect';
import { selectorLoading } from '@/stores/loading/selector';
import {
  selCurrentBetInfo,
  selCurrentAvailableBalance,
  selUserWallet,
} from '@/stores/auth/selectors';
import {
  getAvailableBalance,
  transferBetToAnother,
  getDepositAddressAction,
  withdrawAction,
} from '@/stores/auth/actions';
import {
  NS_AUTH,
  TRANSFER_BET_TO_ANOTHTER,
  GET_AVAILABLE_BALANCE,
  GET_DEPOSIT_ADDRESS,
  WITHDRAW_ACTION,
} from '@/stores/auth/constants';

import Welcome from './components/Welcome';
import BetInfo from './components/BetInfo';
import MyBet from './components/MyBet';
import SystemBet from './components/SystemBet';
// import Information from './components/Information';

import styles from './styles.less';

const Dashboard = (props) => {
  console.log('render dashboard');
  const {
    currentUserBetInfo,
    isLoadingGetAvailableBalance,
    availableBalance,
    isLoadingTransferToAnother,
    isLoadingDepositAddress,
    userWallet = {},
    isLoadingWithdraw,
  } = props;
  const {
    getAvailableBalanceDispatch,
    transferBetToAnotherDispatch,
    getDepositAddressDispatch,
    withdrawDispatch,
  } = props;
  const [visibleDeposit, setVisibleDeposit] = useState(false);
  const [visibleTransfer, setVisibleTransfer] = useState(false);
  const [visibleWithDraw, setVisibleWithDraw] = useState(false);

  useEffect(() => {
    getDepositAddressDispatch();
  }, [getDepositAddressDispatch]);

  const onOpenTransferModal = () => {
    getAvailableBalanceDispatch();
    setVisibleTransfer(true);
  };

  const onOpenWithdrawrModal = () => {
    getAvailableBalanceDispatch();
    setVisibleWithDraw(true);
  };

  return (
    <PageContainer>
      <Welcome currentUserBetInfo={currentUserBetInfo} />

      <BetInfo
        currentUserBetInfo={currentUserBetInfo}
        onOpenDeposit={() => setVisibleDeposit(true)}
        onOpenTransfer={onOpenTransferModal}
        onOpenWithdraw={onOpenWithdrawrModal}
      />
      <div className={styles.dGrid}>
        <MyBet currentUserBetInfo={currentUserBetInfo} />
        <SystemBet currentUserBetInfo={currentUserBetInfo} />
      </div>

      <DepositModal
        isVisible={visibleDeposit}
        setVisible={setVisibleDeposit}
        isLoadingDepositAddress={isLoadingDepositAddress}
        userWallet={userWallet}
      />
      <TransferModal
        isVisible={visibleTransfer}
        setVisible={setVisibleTransfer}
        isLoadingGetAvailableBalance={isLoadingGetAvailableBalance}
        isLoadingTransferToAnother={isLoadingTransferToAnother}
        availableBalance={availableBalance}
        onTransfer={transferBetToAnotherDispatch}
      />
      <WithDrawModal
        isVisible={visibleWithDraw}
        setVisible={setVisibleWithDraw}
        isLoadingGetAvailableBalance={isLoadingGetAvailableBalance}
        isLoadingWithdraw={isLoadingWithdraw}
        availableBalance={availableBalance}
        onWithDraw={withdrawDispatch}
      />
    </PageContainer>
  );
};

// export default memo(Dashboard);

const mapStateToProps = createStructuredSelector({
  isLoadingGetAvailableBalance: selectorLoading(`${NS_AUTH}/${GET_AVAILABLE_BALANCE}`),
  isLoadingTransferToAnother: selectorLoading(`${NS_AUTH}/${TRANSFER_BET_TO_ANOTHTER}`),
  isLoadingWithdraw: selectorLoading(`${NS_AUTH}/${WITHDRAW_ACTION}`),
  isLoadingDepositAddress: selectorLoading(`${NS_AUTH}/${GET_DEPOSIT_ADDRESS}`),
  currentUserBetInfo: selCurrentBetInfo,
  availableBalance: selCurrentAvailableBalance,
  userWallet: selUserWallet,
});

const mapDispatchToProps = (dispatch) => ({
  getAvailableBalanceDispatch: () => dispatch(getAvailableBalance()),
  transferBetToAnotherDispatch: (payload) => dispatch(transferBetToAnother(payload)),
  withdrawDispatch: (payload) => dispatch(withdrawAction(payload)),
  getDepositAddressDispatch: () => dispatch(getDepositAddressAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Dashboard));
