import React from 'react'
import { Popconfirm, Space, Button } from 'antd';

import { formatNumber } from '@/utils/utils';


export default ({ isShow }, { onDeleteOrder }, { editProductOrder }) => {
  return [
    {
      title: "Tên Hàng",
      key: 'name',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: "ĐVT",
      key: 'unit',
      dataIndex: 'unit',
      align: 'left',
      render: (value) => formatNumber(value)
    },
    {
      title: "Số lượng",
      key: 'quantity',
      dataIndex: 'quantity',
      align: 'left',
      render: (value) => formatNumber(value)
    },
    {
      title: "Khối lượng",
      key: 'mass',
      dataIndex: 'mass',
      align: 'left',
      render: (value) => formatNumber(value)
    },
    {
      title: "Trọng lượng",
      key: 'weight',
      dataIndex: 'weight',
      align: 'left',
      render: (value) => formatNumber(value)
    },
    {
      title: "Ghi chú",
      key: 'note',
      dataIndex: 'note',
      align: 'left',
    },
    {
      title: "Thao tác",
      dataIndex: 'operation',
      width: 150,
      render: (text, record, index) => (
        <Space>
          <Button onClick={() => editProductOrder(record)}>Sửa</Button>
          <Popconfirm title="Bạn có đồng ý xoá không" onConfirm={() => onDeleteOrder(index)}>
            <Button>Xoá</Button>
          </Popconfirm>
        </Space>

      ),
      hidden: isShow
    }
  ].filter(item => !item.hidden);
};
