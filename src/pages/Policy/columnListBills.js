import React from 'react'
import moment from 'moment';
import { Popconfirm, Space, Tag, Button } from 'antd';

import { formatNumber } from '@/utils/utils';
import { colorStutusOrder, titleStutusOrder, titlePayType, FORMATS_DATE } from '@/utils/constants';

export default ({ onDelete }, { editBill }, { openModal }) => {
    return [
        {
            title: 'Số mã',
            dataIndex: 'code',
            render: (text, record) => {
                return <Tag color='#f42323' style={{ borderRadius: 15, cursor: "pointer" }} onClick={() => openModal(record.id)}>
                    {text}
                </Tag>
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            render: (value) => {
                return <span>{value ? moment(value).format(FORMATS_DATE.DD_MM_YYYY) : null}</span>
            }
        },
        {
            title: 'Tên hàng',
            dataIndex: 'name',
        },
        {
            title: 'Địa điểm giao hàng',
            dataIndex: 'driverAddress',
        },
        {
            title: 'Số điện thoại đối tác',
            dataIndex: 'partnerPhone',
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalCOD',
            render: (value) => {
                return <span>{value ? formatNumber(value) : null}</span>
            },
        },
        {
            title: 'Tài xế',
            dataIndex: 'driver',
        },
        {
            title: 'Thao tác',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => editBill(record.id)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có đồng ý xóa?"
                        onConfirm={() => onDelete(record.id)}
                    >
                        <Button>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
            align: "center",
        },
    ];
};


