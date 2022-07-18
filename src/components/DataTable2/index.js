import React, { useMemo } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { computePaging } from '@/utils/utils';
import { useIntl } from 'umi';
import * as styles from './style.less';

const dataTableStyle = {};

const DataTable = (props) => {
  const intl = useIntl();
  const {
    loading,
    bordered,
    visibleIndex,
    className,
    columns,
    rowKey,
    dataSource,
    pagination,
    childrenHeader,
    ...restProps
  } = props;

  pagination.current = Math.max((pagination.current || 1), 1); // table ant start 1
  if (!pagination.pageSize) pagination.pageSize = 10;
  if (!pagination.size) pagination.size = 'small';
  if (!pagination.total) pagination.total = 0;
  if (!pagination.showTotal)
    pagination.showTotal = (total, range) =>
      intl.formatMessage(
        { id: 'common.pagination.showTotal' },
        { x: range[0], y: range[1], z: total },
      );

  const _columns = useMemo(() => {
    const { current: pageIndex, pageSize } = pagination;
    const colNumberIndex = {
      title: 'STT',
      align: 'center',
      key: 'numberIndex',
      render: (_value, _row, index) =>
        computePaging({ pageIndex: pageIndex, pageSize, currentIndex: index }), // pageIndex: start 0
      width: 50,
    };

    return visibleIndex ? [colNumberIndex, ...columns] : columns;
  }, [visibleIndex, columns, pagination]);

  return (
    <Table
      style={dataTableStyle}
      className={styles.dataTable}
      loading={loading}
      columns={_columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={pagination.show !== false ? pagination : false}
      {...restProps}
    />
  );
};

DataTable.propTypes = {
  loading: PropTypes.bool,
  bordered: PropTypes.bool,
  visibleIndex: PropTypes.bool,
  className: PropTypes.string,
  columns: PropTypes.array.isRequired,
  rowKey: PropTypes.string,
  dataSource: PropTypes.array.isRequired,
  childrenHeader: PropTypes.any,
  pagination: PropTypes.shape({
    current: PropTypes.number,
    pageSize: PropTypes.number,
    showSizeChanger: PropTypes.bool,
    showQuickJumper: PropTypes.bool,
    size: PropTypes.string,
    total: PropTypes.number,
    showTotal: PropTypes.func,
    onChange: PropTypes.func,
    onShowSizeChange: PropTypes.func,
  }),
  onChange: PropTypes.func,
};

DataTable.defaultProps = {
  loading: false,
  bordered: true,
  visibleIndex: false,
  className: '',
  rowKey: '',
  pagination: {},
  childrenHeader: null,
  onChange: null,
};

export default React.memo(DataTable);
