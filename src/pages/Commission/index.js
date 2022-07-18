import React, { useState, useEffect } from 'react';
import { Typography, Spin, Popconfirm, Button, message, Tag } from 'antd';
import styles from './styles.less';
import DataTable2 from '@/components/DataTable2';
import { createStructuredSelector } from 'reselect';
import { connect, useIntl } from 'umi';
import { selHistoryCommission, selPiLoading, selTotal } from './stores/selectors';
import { piGetAllHistoryCommission } from './stores/actions';
import moment from 'moment';
import { DownCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@/components';

const Commission = (props) => {
  const intl = useIntl();
  const [copyText, setCopyText] = useState('');
  const [paramsInfoDetail, setParamsInfoDetail] = useState({
    paging: { pageIndex: 0, pageSize: 2 },
  });
  const [payloadDetail, setPayloadDetail] = useState({
    pageIndex: 0,
    pageSize: 10,
    searchString: null,
  });

  useEffect(() => {
    var textField = document.createElement('textarea');
    textField.innerText = copyText;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    copyText !== '' && message.success('TXHASH copied');
  }, [copyText]);

  useEffect(() => {
    props.getAllHistoryCommission(payloadDetail);
  }, []);

  const onTableChangeCommission = async (pagination) => {
    const { current, pageSize } = pagination;
    const paging = { pageIndex: current - 1, pageSize };
    const params = { ...paramsInfoDetail, paging };
    setParamsInfoDetail(params);
    props.getAllHistoryCommission({
      ...payloadDetail,
      pageIndex: params.paging.pageIndex,
      pageSize: params.paging.pageSize,
    });
  };

  const columns = [
    {
      title: 'CODE',
      dataIndex: 'id',
      width: 100,
      render: (text) => <span>{`${text.substring(0, 8)}...`}</span>,
    },
    {
      title: 'WEEK',
      dataIndex: 'week',
      width: 50,
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      width: 50,
    },
    {
      title: 'VIP',
      dataIndex: 'level',
      width: 50,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      width: 200,
      align: 'center',
      render: (text, record) =>
        ['done', 'success'].includes(text) ? (
          <DownCircleOutlined style={{ color: 'green' }} />
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
        ) : text === 'new' ? (
          <Tag color="geekblue">{text.toUpperCase()}</Tag>
        ) : (
          <CloseCircleOutlined style={{ color: 'red' }} />
        ),
    },
  ];

  return (
    <PageContainer loading={props.isLoading.page}>
      <div className={styles.headerTable}>
        <Typography.Title
          level={2}
          className={styles.nameHistoryTab}
          style={{
            paddingBottom: 16,
          }}
        >
          HISTORY COMMISSION
        </Typography.Title>
        <DataTable2
          columns={columns}
          rowKey="transactionId"
          dataSource={props.dataHistoryCommission}
          loading={false}
          visibleIndex={false}
          pageIndex={paramsInfoDetail.paging.pageIndex}
          pagination={{
            current: paramsInfoDetail.paging.pageIndex,
            total: props.totalHistory,
            pageSize: paramsInfoDetail.paging.pageSize,
          }}
          onChange={onTableChangeCommission}
        />
      </div>
    </PageContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: selPiLoading,
  dataHistoryCommission: selHistoryCommission,
  totalHistory: selTotal,
});

const mapDispatchToProps = (dispatch) => ({
  getAllHistoryCommission: (payload) => dispatch(piGetAllHistoryCommission(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Commission);
