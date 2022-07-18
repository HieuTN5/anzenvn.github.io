import React from 'react';
import { Row, Col, Modal, Input, } from 'antd';
import { Description, DataTable2 } from '@/components';
import generateCollumns from '../columnModal';
import styles from '../index.less';

const ModalDetail = (props) => {
    const { visible, onCancel, inforOrderModal } = props;
    console.log(inforOrderModal)
    const modalOrderColumns = generateCollumns({ isShow: true }, { onDeleteOrder: null }, { editProductOrder: null })
    const data = [
        {
            "unit": "241",
            "quantity": 214,
            "deliveryOrderId": "6d8a0522-0125-464b-b54b-f0d782fe58ee",
            "mass": 241,
            "weight": 214,
            "note": "124",
            "name": "Bơ",
            "createdBy": null,
            "updatedBy": null,
            "createdDate": "2022-06-28T03:54:05.6607824Z",
            "updatedDate": "2022-06-28T03:54:05.6607825Z",
            "id": "b76a4c4e-06f8-44fc-88f6-08da58b9d8d8"
        },
        {
            "unit": "241",
            "quantity": 214,
            "deliveryOrderId": "6d8a0522-0125-464b-b54b-f0d782fe58eaa",
            "mass": 241,
            "weight": 214,
            "note": "124",
            "name": "Sầu riêng",
            "createdBy": null,
            "updatedBy": null,
            "createdDate": "2022-06-28T03:54:05.6607824Z",
            "updatedDate": "2022-06-28T03:54:05.6607825Z",
            "id": "b76a4c4e-06f8-44fc-88f6-08da58b9d8d7"
        }
    ]
    return (
        <Modal
            title="BIÊN NHẬN VẬN CHUYỂN"
            centered
            visible={visible}
            onOk={onCancel}
            onCancel={onCancel}
            width={1000}
        >
            <Row gutter={24}>
                <Col md={{ span: 12 }}>
                    <strong> MVĐ: </strong> <span>{inforOrderModal?.code}</span>
                </Col>
                <Col md={{ span: 12 }}>
                    <strong> Nhân Viên kinh doanh: </strong>  <span>Sơn Vận Tải</span>
                </Col>
            </Row>
            <br />
            <Row gutter={24}>
                <Col md={{ span: 4 }}>
                    <strong> Nguời gửi: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>{inforOrderModal?.shipper}</span>
                </Col>
                <Col md={{ span: 4 }}>
                    <strong> Người nhận: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>{inforOrderModal?.consignee}</span>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col md={{ span: 4 }}>
                    <strong> Địa chỉ gửi: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>{inforOrderModal?.fromAddress}</span>
                </Col>
                <Col md={{ span: 4 }}>
                    <strong> Địa chỉ nhận: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>{inforOrderModal?.toAddress}</span>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col md={{ span: 4 }}>
                    <strong> Số điện thoại gửi: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>{inforOrderModal?.shipperPhone}</span>
                </Col>
                <Col md={{ span: 4 }}>
                    <strong> Số điện thoại nhận </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>{inforOrderModal?.consigneePhone}</span>
                </Col>
            </Row>
            <br />
            <Row gutter={24}>
                <Col md={{ span: 24 }}>
                    <span>Hai bên thống nhất lượng vận chuyển như sau</span>
                </Col>
            </Row>
            <br />
            <DataTable2
                rowKey="id"
                loading={false}
                columns={modalOrderColumns}
                pagination={{
                    show: false,
                    pageSize: 20
                }}
                dataSource={inforOrderModal?.deliveryOrderDetails || []}
            />
            <br />
            <Row gutter={24}>
                <Col md={{ span: 5 }}>
                    <strong> Cước vận chuyển: </strong>
                </Col>
                <Col md={{ span: 7 }}>
                    <span>{inforOrderModal?.totalAmount}</span>
                </Col>
                <Col md={{ span: 5 }}>
                    <strong> Hình thức thanh toán </strong>
                </Col>
                <Col md={{ span: 7 }}>
                    <span>{inforOrderModal?.paymentType}</span>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col md={{ span: 5 }}>
                    <strong> Hình thức nhận hàng: </strong>
                </Col>
                <Col md={{ span: 7 }}>
                    <span>{inforOrderModal?.sendType}</span>
                </Col>
                <Col md={{ span: 5 }}>
                    <strong> Hình thức giao hàng </strong>
                </Col>
                <Col md={{ span: 7 }}>
                    <span>{inforOrderModal?.receiveType}</span>
                </Col>
            </Row>
            <br />
            <Row gutter={24}>
                <Col md={{ span: 24 }}>
                    <h3><strong>Giá bán</strong></h3>
                </Col>
            </Row>
            <br />
            <div className="App">
                <table>
                    <tr>
                        <th>Giá bán</th>
                        <th>Thành tiền</th>
                    </tr>
                    <tr>
                        <td>Bán ra</td>
                        <td>10,000,000</td>
                    </tr>
                    <tr>
                        <td>Phát sinh khác</td>
                        <td>1,000,000</td>
                    </tr>
                    <tr>
                        <td>Tổng giá bán</td>
                        <td>11,000,000</td>
                    </tr>
                </table>
            </div>
            <br />
            <Row gutter={24}>
                <Col md={{ span: 24 }}>
                    <h3><strong>Giá mua</strong></h3>
                </Col>
            </Row>
            <br />
            <div className="App">
                <table>
                    <tr>
                        <th>Nội dung</th>
                        <th>Đơn vị đảm nhiệm</th>
                        <th>Số tiền</th>
                    </tr>
                    <tr>
                        <td>Trung chuyển</td>
                        <td>Vận tải Xuân Trường</td>
                        <td>5,000,000</td>
                    </tr>
                    <tr>
                        <td>Phí nhận hàng</td>
                        <td>Hiếu gà</td>
                        <td>500,000</td>
                    </tr>
                    <tr>
                        <td>Phí bo giao hàng</td>
                        <td>Kim chó điên</td>
                        <td>500,000</td>
                    </tr>
                    <tr>
                        <td>Khác</td>
                        <td>{""}</td>
                        <td>{0}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}><strong>Tổng cộng</strong></td>
                        <td>6,000,000</td>
                    </tr>
                </table>
            </div>
            <br />
            <Row gutter={24}>
                <Col md={{ span: 24 }}>
                    <h3><strong>Thông tin tài xế</strong></h3>
                </Col>
                <Col md={{ span: 24 }}>
                    <span>Mã bảng kê: BK2206282</span>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col md={{ span: 4 }}>
                    <strong>Tên nhà xe: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>Vận tải Xuân Trường</span>
                </Col>
                <Col md={{ span: 4 }}>
                    <strong> Số điện thoại: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>0941192829</span>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col md={{ span: 4 }}>
                    <strong>Tên tài xế: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>Phạm Thị Hải Yến</span>
                </Col>
                <Col md={{ span: 4 }}>
                    <strong> Số điện thoại: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>0879367919</span>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col md={{ span: 4 }}>
                    <strong>Biển số xe: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>28484</span>
                </Col>
                <Col md={{ span: 4 }}>
                    <strong> CCCD: </strong>
                </Col>
                <Col md={{ span: 8 }}>
                    <span>241426235</span>
                </Col>
            </Row>
        </Modal>
    );
};

export default ModalDetail;
