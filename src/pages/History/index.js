import React from 'react';
import { Typography, Tabs, Popconfirm, Button } from 'antd';
import { useIntl } from 'umi';
import DataTable from '@/components/DataTable';
import PageContainer from '@/components/PageContainer';
import styles from './styles.less';
const { TabPane } = Tabs;

export default () => {
  const intl = useIntl();
  const columns1 = [
    {
      title: 'CODE',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: 'TIME',
      dataIndex: 'time',
      width: 150,
    },
    {
      title: 'ADDRESS FROM',
      dataIndex: 'addressFrom',
      width: 300,
    },
    {
      title: 'ADDRESS TO',
      dataIndex: 'addressTo',
      width: 300,
    },
    {
      title: 'TXHASH',
      dataIndex: 'txHash',
      width: 150,
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      width: 150,
    },
    {
      title: 'FEE',
      dataIndex: 'fee',
      width: 150,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      width: 300,
      align: 'center',
      render: (text, record) => (
        <div>
          <Button type="primary">Resend</Button>
          <Popconfirm
            okText="Ok"
            cancelText="Cancel"
            title="bạn có muốn xóa không"
            onConfirm={() => console.log(record.code)}
          >
            <Button type="primary" style={{ marginLeft: 5 }}>
              Cancel
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const columns2 = [
    {
      title: 'CODE',
      dataIndex: 'code',
      width: 100,
      align: 'center',
    },
    {
      title: 'TIME',
      dataIndex: 'time',
      width: 200,
      align: 'center',
    },
    {
      title: 'ADDRESS FROM',
      dataIndex: 'addressFrom',
      width: 150,
      align: 'center',
    },
    {
      title: 'ADDRESS TO',
      dataIndex: 'addressTo',
      width: 150,
      align: 'center',
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      width: 150,
      align: 'center',
    },
    {
      title: 'FEE',
      dataIndex: 'fee',
      width: 150,
      align: 'center',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      width: 300,
      align: 'center',
      render: (text, record) => (
        <div>
          <Button type="primary">Resend</Button>
          <Popconfirm
            okText="Ok"
            cancelText="Cancel"
            title="bạn có muốn xóa không"
            onConfirm={() => console.log(record.code)}
          >
            <Button type="primary" style={{ marginLeft: 5 }}>
              Cancel
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const columns3 = [
    {
      title: 'CODE',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: 'WEEK',
      dataIndex: 'week',
      width: 150,
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      width: 150,
    },
    {
      title: 'VIP',
      dataIndex: 'vip',
      width: 150,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      width: 150,
      render: (text, record) => (
        <div>
          <Button type="primary">Resend</Button>
          <Popconfirm
            okText="Ok"
            cancelText="Cancel"
            title="bạn có muốn xóa không"
            onConfirm={() => console.log(record.code)}
          >
            <Button type="primary" style={{ marginLeft: 5 }}>
              Cancel
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      code: '5d5fe091',
      time: '2021-08-04 13:31:49',
      addressFrom: '0x0d0a34bd03bb9530fdd6aecbed70b857524a924a',
      addressTo: '0x0d91b54b9a91aac2dce3b485ed4faef0242b7111',
      txHash: '0x2dd1ce',
      amount: '0.0378',
      fee: '0.1',
    },
    {
      key: '2',
      code: '5d5fe091',
      time: '2021-08-04 13:31:49',
      addressFrom: '0x0d0a34bd03bb9530fdd6aecbed70b857524a924a',
      addressTo: '0x0d91b54b9a91aac2dce3b485ed4faef0242b7111',
      txHash: '0x2dd1ce',
      amount: '0.0378',
      fee: '0.1',
    },
    {
      key: '3',
      code: '5d5fe091',
      time: '2021-08-04 13:31:49',
      addressFrom: '0x0d0a34bd03bb9530fdd6aecbed70b857524a924a',
      addressTo: '0x0d91b54b9a91aac2dce3b485ed4faef0242b7111',
      txHash: '0x2dd1ce',
      amount: '0.0378',
      fee: '0.1',
    },
  ];

  const data2 = [
    {
      key: '1',
      code: 'b249ab40',
      time: '2021-08-04 13:31:49',
      addressFrom: 'taikhoan1',
      addressTo: 'bet1',
      amount: '218414',
      fee: '0',
    },
    {
      key: '1',
      code: 'b249ab40',
      time: '2021-08-04 13:31:49',
      addressFrom: 'taikhoan1',
      addressTo: 'bet1',
      amount: '218414',
      fee: '0',
    },
    {
      key: '1',
      code: 'b249ab40',
      time: '2021-08-04 13:31:49',
      addressFrom: 'taikhoan1',
      addressTo: 'bet1',
      amount: '218414',
      fee: '0',
    },
  ];

  return (
    <PageContainer>
      <Typography.Title
        level={2}
        className={styles.nameTitle}
        style={{
          paddingBottom: 32,
        }}
      >
        SELECT YOUR TRANSACTIONS
      </Typography.Title>
      <div className={styles.headerTable}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="ETHETINUM" key="1">
            <Typography.Title level={2} className={styles.nameHistoryTab}>
              HISTORY ETHETINUM
            </Typography.Title>
            <DataTable columns={columns1} scroll={{ x: 1450 }} dataSource={data} />
          </TabPane>
          <TabPane tab="NAGA" key="2">
            <Typography.Title level={2} className={styles.nameHistoryTab}>
              HISTORY NAGA
            </Typography.Title>
            <DataTable columns={columns2} dataSource={data2} pagination={false} />
          </TabPane>
          <TabPane tab="COMMISSION" key="3">
            <Typography.Title level={2} className={styles.nameHistoryTab}>
              COMMISSION
            </Typography.Title>
            <DataTable columns={columns3} dataSource={data} pagination={false} />
          </TabPane>
        </Tabs>
      </div>
    </PageContainer>
  );
};
