import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Tag, Input, Button, Modal, Space, Form, InputNumber, DatePicker, Table, Typography, Checkbox } from 'antd'
import { DataTable2 } from '@/components';
import { connect } from 'umi';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { FORMATS_DATE } from '@/utils/constants';
const { Text } = Typography;
import { formatNumber, isEmpty, openNotificationSuccess, openNotificationError } from '@/utils/utils';
import { asyncCreateAndUpdateBillAction, asyncGetListOrderReadyAction } from '../stores/actions';
import { selectListOrderReady } from '../stores/selectors';
import generateOrderDelivery from '../columnOrderDelivery';
const CreateBill = (props) => {
    const {
        formBill,
        onTableChange,
        formModal,
        dataDelivery,
        setDataDelivery,
        setTitlePage,
        titlePage,
        advanceAmount,
        setAdvanceAmount
    } = props
    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [maxValueQuantity, setMaxValueQuantiry] = useState(0);
    const [orderDelivery, setOrderDelivery] = useState({});
    const [valueSearch, setValueSearch] = useState('');
    const [pagingCreateUpdate, setPagingCreateUpdate] = useState({
        code: valueSearch, PageIndex: 1, PageSize: 10
    });
    const [isShowStatus, setIsShowStatus] = useState(false)

    const [dataOrderDelivery, setDataOrderDelivery] = useState([]);
    const { createUpdateBillDispatch, getListOrderReadyDispatch } = props

    const handleDeleteOrder = (index) => {
        setDataDelivery([...dataDelivery.slice(0, index), ...dataDelivery.slice(index + 1)]);
    }
    const columns = generateOrderDelivery({ onDelete: handleDeleteOrder }, { isShow: false });

    const openListOrderReady = async () => {
        const res = await getListOrderReadyDispatch(pagingCreateUpdate);
        if (res) {
            const listOrderCode = dataDelivery.map((item) => { return item.code });
            const data = res?.items.filter(item => !listOrderCode.includes(item.code));
            setDataOrderDelivery(data);
            setVisible(true);
        }
    }
    const addDataToTableDelivery = (values) => {
        const newData = { ...orderDelivery, quantity: values.quantity, cod: values.amount };
        setDataDelivery([...dataDelivery, newData])
        setVisibleModal(false);
        setVisible(false);
    }

    const editWhenAddToTable = (id) => {
        formModal.resetFields();
        const res = dataOrderDelivery.find(item => item.code === id);
        if (res) {
            setIsShowStatus(res.status === "Transhipment" ? true : false);
            formModal.setFieldsValue({
                quantity: res.quantity,
                amount: res.cod
            })
            setMaxValueQuantiry(res.quantity);
            setOrderDelivery(res);
        }
        setVisibleModal(true);
    }
    const columnsModal = [
        {
            title: 'Mã vận đơn',
            dataIndex: 'code',
            render: (text, record) => {
                return <Tag color='#f42323' style={{ borderRadius: 15 }} onClick={() => editOrder(record.numberCode)}>
                    {text}
                </Tag>
            }
        },
        {
            title: 'Tên hàng',
            dataIndex: 'name',
        },
        {
            title: 'Thao tác',
            render: (text, record) => (
                <Button onClick={() => editWhenAddToTable(record.code)}>Thêm</Button>
            ),
        },
    ];

    const handleCancel = () => {
        setVisible(false)
    }

    const onFinish = async (values) => {
        console.log(dataDelivery)
        if (isEmpty(dataDelivery)) {
            openNotificationError("Vui lòng thêm đơn hàng cần vận chuyển");
            return
        }
        const payload = { ...values, ladingDate: moment(values.ladingDate, FORMATS_DATE.DD_MM_YYYY).format(FORMATS_DATE.YYYY_MM_DD), deliveryOrderBillOfLadings: dataDelivery }
        const res = await createUpdateBillDispatch(payload);
        if (!isEmpty(res)) {
            openNotificationSuccess(`${titlePage} Thành công`);
            return;
        }
        openNotificationError(`${titlePage} thất bại`);
    };

    const changeAdvanceAmout = (value) => {
        setAdvanceAmount(value)
    }

    const clearData = () => {
        setDataDelivery([]);
        formBill.resetFields();
        formBill.setFieldsValue({ ladingDate: moment() });
        setTitlePage("Tạo mới bảng kê");
    }

    return (
        <Fragment>
            <h1 align="Center">BẢNG KÊ GIAO NHẬN VẬN CHUYỂN</h1>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                name='formBill'
                form={formBill}
                layout="vertical"
            >
                <Row gutter={24}>
                    <Col xs={24} md={8} style={{ display: 'none' }}>
                        <Form.Item
                            label="id"
                            name="id"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Mã bảng kê"
                            name="code"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Ngày tháng"
                            name="ladingDate"
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format={FORMATS_DATE.DD_MM_YYYY}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Hợp đồng số"
                            name="referenceContract"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Tên công ty"
                            name="partner"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Số điện thoại"
                            name="partnerPhone"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="MST"
                            name="partnerTax"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Người lái xe"
                            name="driver"
                            rules={[{ required: true, message: 'Vui lòng nhập tên người lái xe!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Biển số xe"
                            name="licensePlate"
                            rules={[{ required: true, message: 'Vui lòng nhập biển số xe!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Địa chỉ"
                            name="driverAddress"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="CMND"
                            name="driverIdentity"
                            rules={[{ required: true, message: 'Vui lòng nhập CMND!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Đã tạm ứng"
                            name="advanceAmount"
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value?.replace(/\$\s?|(,*)/g, '')}
                                onChange={changeAdvanceAmout}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Giấy phép lái xe"
                            name="drivingLicense"
                            rules={[{ required: true, message: 'Vui lòng nhập giấy phép lái xe!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Điện thoại lái xe"
                            name="driverPhone"
                            rules={[{ required: true, message: 'Vui lòng nhập Điện thoại lái xe!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Tổng cước cho xe"
                            name="totalFreight"
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value?.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row gutter={24}>
                <div style={{ marginLeft: "auto", paddingRight: 12 }}>
                    <Space>
                        <Button
                            type="primary"
                            onClick={openListOrderReady}
                        >
                            Danh sách hàng cần đi
                        </Button>
                        <Button
                            type="primary"
                            onClick={clearData}
                        >
                            Xóa dữ liệu để tạo mới
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit" form="formBill"
                        >
                            GỬi
                        </Button>
                    </Space>
                </div>

            </Row>
            <br />
            <DataTable2
                rowKey="numberCode"
                columns={columns}
                dataSource={dataDelivery}
                loading={false}
                visibleIndex
                onChange={onTableChange}
                summary={pageData => {
                    const totalAmount = pageData.reduce((prev, cur) => prev + cur.cod, 0)
                    return !isEmpty(dataDelivery) && (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell align='right' colSpan={8}><strong>Tổng cộng</strong></Table.Summary.Cell>
                                <Table.Summary.Cell align='center'>
                                    <Text >{formatNumber(totalAmount)}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                            <Table.Summary.Row>
                                <Table.Summary.Cell align='right' colSpan={8}><strong>Đã tạm ứng</strong></Table.Summary.Cell>
                                <Table.Summary.Cell align='center'>
                                    <Text>{!isEmpty(advanceAmount) ? formatNumber(Number(advanceAmount)) : 0}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    );
                }}
            />
            <Modal
                title="DANH SÁCH ĐƠN HÀNG CẦN ĐI"
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={800}
            >
                <DataTable2
                    rowKey="code"
                    columns={columnsModal}
                    dataSource={dataOrderDelivery || []}
                    loading={false}
                    visibleIndex={false}
                    pageIndex={pagingCreateUpdate.PageIndex}
                    pagination={{
                        current: pagingCreateUpdate.PageIndex,
                        total: dataOrderDelivery?.length,
                        pageSize: pagingCreateUpdate.PageSize,
                    }}
                    onChange={onTableChange}
                />
            </Modal>
            <Modal
                title="Chỉnh sửa đơn hàng đi"
                width={720}
                visible={visibleModal}
                bodyStyle={{ paddingBottom: 80 }}
                onCancel={() => setVisibleModal(false)}
                footer={
                    <Space>
                        <Button onClick={() => setVisibleModal(false)}>Đóng</Button>
                        <Button htmlType="submit" form="formModal" type="primary">
                            Gửi
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" name='formModal' form={formModal}
                    onFinish={addDataToTableDelivery}
                    initialValues={{
                        isTranshipment: false,
                        isGone: false,
                    }}
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            {!isShowStatus ?
                                <Form.Item
                                    name="isTranshipment"
                                    valuePropName="checked"
                                >
                                    <Checkbox>Chuyển tải</Checkbox>
                                </Form.Item> :
                                <Form.Item
                                    name="isGone"
                                    valuePropName="checked"
                                >
                                    <Checkbox>Đã Hoàn Thành</Checkbox>
                                </Form.Item>
                            }
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="quantity"
                                label="Số lượng"
                                rules={[{ required: true, message: 'Vui lòng nhập Số Lượng' }]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    max={maxValueQuantity}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="amount"
                                label="Số phụ thu"
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    listOrderReady: selectListOrderReady
});

const mapDispatchToProps = (dispatch) => ({
    createUpdateBillDispatch: (payload) => asyncCreateAndUpdateBillAction(dispatch)(payload),
    getListOrderReadyDispatch: (payload) => asyncGetListOrderReadyAction(dispatch)(payload)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBill);
