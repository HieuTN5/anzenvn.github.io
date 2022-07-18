import React from 'react';
import { Table } from 'antd';

import styles from './index.less';

const DataTable = (props) => {
  const { loading, columns, dataSource, ...restProps } = props;

  return (
    <Table
      className={styles.dataTable}
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      {...restProps}
    />
  );
};

DataTable.defaultProps = {
  loading: false,
};

export default DataTable;
