import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Tag, Input, Button, Modal, Space, Form, Select, InputNumber, DatePicker, Table, Typography, Tabs } from 'antd'
import { connect } from 'umi';
import { createStructuredSelector } from 'reselect';
import { selectorDataBills, selectIsLoading } from './stores/selectors';
import { PageContainer, DataTable2 } from '@/components';
import generateOrderDelivery from './columnOrderDelivery';
import generatecolumnBills from './columnListBills'
import styles from './styles.less';
import moment from 'moment';
import { getAllBillsAction, asyncDeleteBillAction, asyncGetDetailBillAction } from './stores/actions';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { formatNumber, isEmpty, openNotificationSuccess, openNotificationError } from '@/utils/utils';
import CreateBill from "./components/createBill"
const { TabPane } = Tabs;
const { Text } = Typography;
const { Option } = Select;
const Accountant = (props) => {
  const [formModal] = Form.useForm();
  const [formBill] = Form.useForm();
  const [valueSearch, setValueSearch] = useState('');
  const [paginatios, setPaginatios] = useState({
    filter: valueSearch, pageIndex: 1, pageSize: 10
  });
  const [titlePage, setTitlePage] = useState('Tạo mới bảng kê');
  const [dataDelivery, setDataDelivery] = useState([]);
  const [advanceAmount, setAdvanceAmount] = useState(null);
  const [dataInformation, setDataInformation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { isLoading, dataBills } = props
  const { getAllBillsDispatch, deleteBillDispatch, getDetailBillDispatch } = props
  useEffect(() => {
    getAllBillsDispatch(paginatios);
  }, [getAllBillsDispatch, paginatios]);



  const handleDeleteOrder = (index) => {
    setDataDelivery([...dataDelivery.slice(0, index), ...dataDelivery.slice(index + 1)]);
  }

  const onDeleteOrder = async (id) => {
    const response = await deleteBillDispatch(id);
    if (!isEmpty(response)) {
      getAllBillsDispatch(paginatios);
      openNotificationSuccess(`Xóa Thành công`);
      return
    }
    openNotificationError("Xóa không thành công");
  }


  const editBillPage = async (id) => {
    const response = await getDetailBillDispatch(id);
    if (response) {
      formBill.setFieldsValue({
        id: response.id,
        code: response.code,
        ladingDate: moment(response.ladingDate) || moment(),
        referenceContract: response.referenceContract,
        partner: response.partner,
        partnerPhone: response.partnerPhone,
        partnerTax: response.partnerTax,
        driver: response.driver,
        licensePlate: response.licensePlate,
        driverAddress: response.driverAddress,
        driverIdentity: response.driverIdentity,
        drivingLicense: response.drivingLicense,
        driverPhone: response.driverPhone,
        totalFreight: response.totalFreight,
        advanceAmount: response.advanceAmount
      });
      setDataDelivery(response.deliveryOrderBillOfLadings);
      setAdvanceAmount(response.advanceAmount)
      setValueTab("2");
      setDataInformation(response);
      setTitlePage("Sửa đổi bảng kê");
    }
  }

  const openModal = async (id) => {
    const response = await getDetailBillDispatch(id);
    !isEmpty(response) && setDataInformation(response);
    setShowModal(true)
  }
  const columns = generateOrderDelivery({ onDelete: handleDeleteOrder }, { isShow: true });
  const columnBills = generatecolumnBills({ onDelete: onDeleteOrder }, { editBill: editBillPage }, { openModal: openModal });

  const onTableChange = async (pagination) => {
    const { current, pageSize } = pagination;
    const paging = { pageIndex: current - 1, pageSize };
    const params = { ...paginatios, paging };
    setPaginatios(params);
  };

  const onCreate = () => {
    setShowModal(true)
  }

  return (
    <PageContainer
      loading={isLoading.page}
    >
      <Row gutter={24}>
        <Col md={{ span: 12 }}>
          <Button
            type="primary"
            onClick={onCreate}
          >
            Tạo mới
          </Button>
        </Col>
      </Row>
      <br />
      <DataTable2
        rowKey="numberCode"
        columns={columnBills}
        dataSource={dataBills?.items || []}
        loading={false}
        visibleIndex
        pageIndex={paginatios.pageIndex}
        pagination={{
          current: paginatios.pageIndex,
          total: dataBills?.total,
          pageSize: paginatios.pageSize,
        }}
        onChange={onTableChange}
      />
      <Modal
        title={`Tạo mới `}
        width={720}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <Space>
            <Button onClick={() => setShowModal(false)}>Đóng</Button>
            <Button htmlType="submit" form="formModal" onClick={() => setShowModal(false)} type="primary">
              Tải xuống
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" name='formModal' form={formModal}>
          <Row gutter={24}>
            <Col xs={24} md={24}>
              <h2> <strong>Giá mua</strong></h2>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Bán ra"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Phát sinh khác"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col xs={24} md={24}>
              <h2> <strong>Giá bán</strong></h2>
            </Col>
            <Col xs={24} md={24}>
              <strong>Trung chuyển</strong>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Đơn vị đảm nhiệm"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Số tiền"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} md={24}>
              <strong>Phí nhận hàng</strong>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Đơn vị đảm nhiệm"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Số tiền"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} md={24}>
              <strong>Phí bo giao hàng</strong>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Đơn vị đảm nhiệm"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Số tiền"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} md={24}>
              <strong>Khác</strong>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Đơn vị đảm nhiệm"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Số tiền"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col xs={24} md={24}>
              <h2> <strong>Thông tin tài xế</strong></h2>
            </Col>
            <Col xs={24} md={24}>
              <strong>Mã bảng kê: BK220611</strong>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Tên nhà xe"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Số điện thoại"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Tên tài xế"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Số điện thoại"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Biể số xe"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="CCCD"
                name="code"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </PageContainer >
  );
};

const mapStateToProps = createStructuredSelector({
  dataBills: selectorDataBills,
  isLoading: selectIsLoading
});

const mapDispatchToProps = (dispatch) => ({
  getAllBillsDispatch: (payload) => dispatch(getAllBillsAction(payload)),
  deleteBillDispatch: (payload) => asyncDeleteBillAction(dispatch)(payload),
  getDetailBillDispatch: (payload) => asyncGetDetailBillAction(dispatch)(payload)
});

export default connect(mapStateToProps, mapDispatchToProps)(Accountant);
