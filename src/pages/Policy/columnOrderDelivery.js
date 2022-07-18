import React from 'react'
import { Popconfirm, Space, Button, Tag } from 'antd';

import { formatNumber } from '@/utils/utils';
import { titlePayType } from '@/utils/constants';

export default ({ onDelete }, { isShow }) => {
    return [
        {
            title: 'MVĐ',
            dataIndex: 'code',
            render: (text, record) => {
                return <Tag color='#f42323' style={{ borderRadius: 15 }}>
                    {text}
                </Tag>
            }
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'consignee',
        },
        {
            title: 'Tên hàng',
            dataIndex: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (value) => formatNumber(value)
        },
        {
            title: 'Nơi giao',
            dataIndex: 'toAddress',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'consigneePhone',
        },
        {
            title: 'Hình thức thu tiền',
            dataIndex: 'paymentType',
            render: (text, record) => {
                return <span>
                    {titlePayType(text)}
                </span>
            },
            align: "center"
        },
        {
            title: 'Số tiền lái xe thu',
            dataIndex: 'cod',
            render: (value) => formatNumber(value),
            align: "center"
        },
        {
            title: 'Thao tác',
            render: (text, record, index) => (
                <Space size="middle">
                    <Popconfirm
                        title="Bạn có đồng ý xóa?"
                        onConfirm={() => onDelete(index)}
                    >
                        <Button>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
            align: "center",
            hiden: isShow,
        },
    ].filter(item => !item.hiden);
};


