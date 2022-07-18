import React, { useEffect, useState } from 'react';
import { Typography, Spin } from 'antd';
import { DownCircleOutlined } from '@ant-design/icons';
import DataTable2 from '@/components/DataTable2';
import styles from './styles.less';
import { createStructuredSelector } from 'reselect';
import { connect, useIntl } from 'umi';
import { selHistoryDeposit, selPiLoading, selTotal } from './stores/selectors';
import { piGetAllHistoryDeposit } from './stores/actions';
import moment from 'moment';
import { PageContainer } from '@/components';

const Deposit = (props) => {
  const intl = useIntl();

  const [paramsInfoDetail, setParamsInfoDetail] = useState({
    paging: { pageIndex: 0, pageSize: 2 },
  });
  const [payloadDetail, setPayloadDetail] = useState({
    pageIndex: 0,
    pageSize: 5,
    searchString: null,
    type: 'deposit',
  });
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
      width: 100,
      align: 'center',
      render: (text, record) => <DownCircleOutlined style={{ color: '#33be91' }} />,
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      width: 100,
      align: 'center',
    },
  ];
  useEffect(() => {
    props.getAllHistoryDeposit(payloadDetail);
  }, []);

  const onTableChangeDeposit = async (pagination) => {
    const { current, pageSize } = pagination;
    const paging = { pageIndex: current - 1, pageSize };
    const params = { ...paramsInfoDetail, paging };
    setParamsInfoDetail(params);
    props.getAllHistoryDeposit({
      ...payloadDetail,
      pageIndex: params.paging.pageIndex,
      pageSize: params.paging.pageSize,
    });
  };

  return (
    <PageContainer loading={props.isLoading.page}>
      <div>
        <Typography.Title
          level={2}
          className={styles.nameHistoryTab}
          style={{
            paddingBottom: 16,
          }}
        >
          HISTORY DEPOSIT
        </Typography.Title>
        <DataTable2
          rowKey="transactionId"
          columns={columns}
          dataSource={props.dataHistoryDeposit}
          loading={false}
          visibleIndex={false}
          pageIndex={paramsInfoDetail.paging.pageIndex}
          pagination={{
            current: paramsInfoDetail.paging.pageIndex,
            total: props.totalHistory,
            pageSize: paramsInfoDetail.paging.pageSize,
          }}
          onChange={onTableChangeDeposit}
        />
      </div>
    </PageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selPiLoading,
  dataHistoryDeposit: selHistoryDeposit,
  totalHistory: selTotal,
});

const mapDispatchToProps = (dispatch) => ({
  getAllHistoryDeposit: (payload) => dispatch(piGetAllHistoryDeposit(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
