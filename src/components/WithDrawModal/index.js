// import React, { memo } from 'react';
// import { Button, Modal, Form, message, Input, Select } from 'antd';
// import Qrcode from 'qrcode.react';

// import bgQr from '@/assets/images/bg-qr.svg';
// import styles from './styles.less';

// const { Option } = Select;

// const WithDrawModal = (props) => {
//   const { isVisible, setVisible } = props;

//   console.log('Render WithDrawModal');

//   return (
//     <Modal visible={isVisible} onCancel={() => setVisible(false)} width={672} footer={null}>
//       <div className={styles.withdrawContainer}>
//         <h2>WITHDRAW</h2>
//         <p>Available Withdraw: (0 BIT ≈ 0.0000 ETH)</p>
//       </div>
//       <Form name="transfer" layout="vertical" size="large" autoComplete="off" requiredMark={false}>
//         <Form.Item
//           name="crypto"
//           label="Crypto"
//           rules={[{ required: true, message: 'Please select your crypto!' }]}
//         >
//           <Select defaultValue="erc20">
//             <Option value="erc20">ETH-ERC20</Option>
//             <Option value="trc20">USDT-TRC20</Option>
//           </Select>
//         </Form.Item>
//         <div className={styles.dGrid}>
//           <Form.Item
//             name="amount"
//             rules={[{ required: true, message: 'Please input the captcha you got!' }]}
//             extra={
//               <p className={styles.amountExtra}>
//                 Min transfer <span>2 BET</span>
//               </p>
//             }
//           >
//             <Input placeholder="Amount" />
//           </Form.Item>

//           <Button type="primary">Max</Button>
//         </div>

//         <Form.Item
//           name="address"
//           rules={[{ required: true, message: 'Please input your address withdraw' }]}
//         >
//           <Input placeholder="Address withdraw" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary">Withdraw</Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default memo(WithDrawModal);

import React, { memo, useState, useEffect } from 'react';
import { Modal, Form, Input, Typography, Tabs, Tag, Button, Skeleton, Select } from 'antd';
import { addCommaThousand, getCookie } from '@/utils/utils';
import { notifyInstant } from '@/utils/notification';
import InputNumberOnly from '../InputNumberOnly';
import styles from './styles.less';
import { COOKIE_NAMES } from '@/utils/constants';

const { Title } = Typography;
const { Option } = Select;

const WITHDRAW_STEP = {
  INPUT: '1',
  AUTHEN: '2',
};

const { TabPane } = Tabs;

const WithDrawModal = (props) => {
  const {
    isVisible,
    setVisible,
    isLoadingGetAvailableBalance,
    availableBalance,
    onWithDraw,
    isLoadingWithdraw,
  } = props;
  const [form] = Form.useForm();

  const [stepWithdraw, setstepWithdraw] = useState(WITHDRAW_STEP.INPUT);

  const calPercentBalance = (percent) => {
    const balance = availableBalance.balance || 0.0;
    let result = (balance * percent) / 100;
    if (result < 2) {
      result = 2;
      notifyInstant.warning('Minimum withdraw amount is 2 BET');
    }
    form.setFieldsValue({ amount: result });
  };

  const using2fa = JSON.parse(getCookie(COOKIE_NAMES.USING_2FA));

  const onSubmitWithdraw = (values) => {
    if (stepWithdraw === WITHDRAW_STEP.INPUT && using2fa) {
      setstepWithdraw(WITHDRAW_STEP.AUTHEN);
    } else {
      const payload = { values, callback: onCloseModal };
      onWithDraw(payload);
    }
  };

  const onCloseModal = () => {
    setstepWithdraw(WITHDRAW_STEP.INPUT);
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal visible={isVisible} onCancel={onCloseModal} width={672} footer={null} destroyOnClose>
      <div className={styles.wrapFrom}>
        <Form
          name="withdrawForm"
          layout="vertical"
          size="large"
          autoComplete="off"
          form={form}
          onFinish={onSubmitWithdraw}
          requiredMark={false}
          initialValues={{ blockchain: 'erc20' }}
        >
          <Tabs animated activeKey={stepWithdraw} onChange={(key) => setstepWithdraw(key)}>
            <TabPane key={WITHDRAW_STEP.INPUT}>
              <div className={styles.transferContainer}>
                <h2>WithDraw</h2>
              </div>
              <div className={styles.balanceWrap}>
                <p>BET balance:</p>
                <span>
                  {isLoadingGetAvailableBalance ? (
                    <Skeleton.Input shape="square" style={{ width: 60 }} active size="small" />
                  ) : (
                    addCommaThousand(availableBalance.balance)
                  )}{' '}
                  BET
                </span>
              </div>
              <Form.Item
                name="blockchain"
                label="Crypto:"
                rules={[{ required: true, message: 'Please select your crypto!' }]}
              >
                <Select>
                  <Option value="erc20">ETH-ERC20</Option>
                  <Option value="trc20">USDT-TRC20</Option>
                </Select>
              </Form.Item>
              <div className={styles.dGrid}>
                <Form.Item
                  name="amount"
                  rules={[{ required: true, message: 'Please input transfer amount' }]}
                  extra={
                    <div className={styles.tagMax}>
                      <Tag color="#ffbd2f" onClick={() => calPercentBalance(100)}>
                        100%
                      </Tag>
                      <Tag color="#ffbd2f" onClick={() => calPercentBalance(50)}>
                        50%
                      </Tag>
                      <Tag color="#ffbd2f" onClick={() => calPercentBalance(20)}>
                        20%
                      </Tag>
                    </div>
                  }
                >
                  <InputNumberOnly
                    name="amount"
                    inputProps={{
                      placeholder: 'Enter Transfer Amount',
                      autoComplete: 'false',
                      precision: 2,
                      min: 2,
                      autoFocus: true,
                    }}
                    noStyle
                  />
                </Form.Item>
              </div>
              <Form.Item
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.blockchain !== curValues.blockchain
                }
                noStyle
              >
                {({ getFieldValue }) => {
                  return (
                    <Form.Item
                      name="receiver"
                      rules={[
                        {
                          required: true,
                          message:
                            getFieldValue('blockchain') === 'erc20'
                              ? 'Please input ETH (ERC20) Address'
                              : 'Please input USDT (TRC20) Address',
                        },
                      ]}
                    >
                      <Input
                        placeholder={
                          getFieldValue('blockchain') === 'erc20'
                            ? 'ETH (ERC20) Address'
                            : 'USDT (TRC20) Address'
                        }
                        allowClear
                      />
                    </Form.Item>
                  );
                }}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoadingWithdraw}>
                  Withdraw
                </Button>
              </Form.Item>

              <div className={styles.minimum}>
                <p>
                  Minimum withdraw amount: <span>2 BET</span>
                </p>
              </div>
            </TabPane>
            <TabPane key={WITHDRAW_STEP.AUTHEN}>
              <div className={styles.transferContainer}>
                <h2>AUTHENTICATION</h2>
              </div>
              <div className={styles.balanceWrap}>
                <p>Enter the code generated by your authenticator app</p>
              </div>
              <Form.Item
                name="code2fa"
                rules={[
                  { required: true, message: 'Please input two-factor authentication code!' },
                ]}
              >
                <Input placeholder="Two-factor authentication" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoadingWithdraw}>
                  Verify
                </Button>
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(WithDrawModal);
