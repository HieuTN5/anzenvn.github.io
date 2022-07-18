import React, { useEffect, useState } from 'react';
import { Typography, Spin, Popconfirm, Button, message } from 'antd';
import { DownCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import DataTable2 from '@/components/DataTable2';
import styles from './styles.less';
import { createStructuredSelector } from 'reselect';
import { connect, useIntl } from 'umi';
import { selHistoryWithdraw, selPiLoading, selTotal } from './stores/selectors';
import { PageContainer } from '@/components';
import {
  piGetAllHistoryWithdraw,
  piResendHistoryWithdraw,
  piCancelHistoryWithdraw,
} from './stores/actions';
import moment from 'moment';
const Deposit = (props) => {
  const intl = useIntl();

  const [paramsInfoDetail, setParamsInfoDetail] = useState({
    paging: { pageIndex: 0, pageSize: 2 },
  });
  const [payloadDetail, setPayloadDetail] = useState({
    pageIndex: 0,
    pageSize: 5,
    searchString: null,
    type: 'withdraw',
  });

  const resendHistory = async (id) => {
    const response = await props.resendHistoryWithdraw(id);
    if (response) {
      props.getAllHistoryWithdraw(payloadDetail);
    }
  };

  const cancelHistory = async (id) => {
    const response = await props.cancelHistoryWithdraw(id);
    if (response) {
      props.getAllHistoryWithdraw(payloadDetail);
    }
  };

  const columns = [
    {
      title: 'TIME',
      dataIndex: 'time',
      width: 150,
      render: (text) => <span>{moment(text).format('DD/MM/YYYY HH:mm:ss')}</span>,
    },
    {
      title: 'SENDER',
      dataIndex: 'from',
      width: 150,
    },
    {
      title: 'RECIPIENT',
      dataIndex: 'to',
      width: 150,
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      width: 100,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      width: 300,
      align: 'center',
      render: (text, record) =>
        ['done', 'success'].includes(text) ? (
          <DownCircleOutlined style={{ color: '#33be91' }} />
        ) : text === 'wait' ? (
          <div>
            <Button type="primary" onClick={() => resendHistory(record.transactionId)}>
              Resend
            </Button>
            <Popconfirm
              okText="Ok"
              cancelText="Cancel"
              title="Do you want cancel?"
              onConfirm={() => cancelHistory(record.transactionId)}
            >
              <Button type="primary" style={{ marginLeft: 5 }}>
                Cancel
              </Button>
            </Popconfirm>
          </div>
        ) : (
          <CloseCircleOutlined style={{ color: 'red' }} />
        ),
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      width: 100,
      align: 'center',
    },
  ];
  useEffect(() => {
    props.getAllHistoryWithdraw(payloadDetail);
  }, []);

  const onTableChangeWithdraw = async (pagination) => {
    const { current, pageSize } = pagination;
    const paging = { pageIndex: current - 1, pageSize };
    const params = { ...paramsInfoDetail, paging };
    setParamsInfoDetail(params);
    props.getAllHistoryWithdraw({
      ...payloadDetail,
      pageIndex: params.paging.pageIndex,
      pageSize: params.paging.pageSize,
    });
  };

  return (
    <PageContainer loading={props.isLoading.page}>
      <Typography.Title
        level={2}
        className={styles.nameHistoryTab}
        style={{
          paddingBottom: 16,
        }}
      >
        HISTORY WITHDRAW
      </Typography.Title>
      <DataTable2
        rowKey="transactionId"
        columns={columns}
        dataSource={props.dataHistoryWithdraw}
        loading={props.isLoading.page}
        pageIndex={paramsInfoDetail.paging.pageIndex}
        pagination={{
          current: paramsInfoDetail.paging.pageIndex,
          total: props.totalHistory,
          pageSize: paramsInfoDetail.paging.pageSize,
        }}
        onChange={onTableChangeWithdraw}
      />
    </PageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selPiLoading,
  dataHistoryWithdraw: selHistoryWithdraw,
  totalHistory: selTotal,
});

const mapDispatchToProps = (dispatch) => ({
  getAllHistoryWithdraw: (payload) => dispatch(piGetAllHistoryWithdraw(payload)),
  resendHistoryWithdraw: (payload) => piResendHistoryWithdraw(dispatch)(payload),
  cancelHistoryWithdraw: (payload) => piCancelHistoryWithdraw(dispatch)(payload),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
