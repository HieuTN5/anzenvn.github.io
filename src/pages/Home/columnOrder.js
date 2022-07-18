import React from 'react'
import moment from 'moment';
import { Popconfirm, Space, Tag, Button } from 'antd';

import { formatNumber } from '@/utils/utils';
import { colorStutusOrder, titleStutusOrder, titlePayType, FORMATS_DATE } from '@/utils/constants';

export default ({ onDelete }, { isShow }, { editOrder }, { openModalDetail }) => {
    return [
        {
            title: 'Số mã',
            dataIndex: 'code',
            render: (text, record) => {
                return <Tag color='#f42323' style={{ borderRadius: 15, cursor: "pointer" }} onClick={() => text ? openModalDetail(record.id) : null}>
                    {text}
                </Tag>
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'orderDate',
            render: (value) => {
                return <span>{value ? moment(value).format(FORMATS_DATE.DD_MM_YYYY) : null}</span>
            }
        },
        {
            title: 'Địa điểm nhận hàng',
            dataIndex: 'fromAddress',
        },
        {
            title: 'Địa điểm giao hàng',
            dataIndex: 'toAddress',
        },
        {
            title: 'Phí',
            dataIndex: 'totalAmount',
            render: (value) => {
                return <span>{value ? formatNumber(value) : null}</span>
            },
            hidden: isShow
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            hidden: isShow
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text, record) => {
                return <Tag color={colorStutusOrder(text)}>
                    {titleStutusOrder(text)}
                </Tag>
            }
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'paymentType',
            render: (text, record) => {
                return <span>
                    {titlePayType(text)}
                </span>
            },
            align: "center"
        },
        {
            title: 'Đơn hàng hoàn tất',
            dataIndex: 'finish',
            render: (text, record) => {
                return <Tag color={text === true ? 'green' : 'red'}>
                    {text === true ? "Đã hoàn tất" : "Chưa hoàn tất"}
                </Tag>
            }
        },
        {
            title: 'Thao tác',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => editOrder(record.id)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có đồng ý xóa?"
                        onConfirm={() => onDelete(record.id)}
                    >
                        <Button>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
            align: "center"
        },
    ].filter(item => !item.hidden);
};


