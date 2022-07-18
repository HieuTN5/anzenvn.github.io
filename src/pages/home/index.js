import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Input, Button, Radio, Space, Form, DatePicker, Drawer, Select, Card, InputNumber, Skeleton } from 'antd'
import { connect } from 'umi';
import { createStructuredSelector } from 'reselect';
import { PageContainer, DataTable2 } from '@/components';
import { RECEIVE_TYPE, PAY_TYPE, DELIVERY_TYPE, FORMATS_DATE, PROVINCE } from '@/utils/constants';
import { isEmpty, openNotificationSuccess, openNotificationError } from '@/utils/utils';
import { getAllOrdersAction, getDetailOrderAction, asyncCreateOrderAction, asyncDeleteOrderAction, getInfOrderAction } from './stores/actions';
import { selectorDataOrders, selectIsLoading, selectInfOrder } from './stores/selectors';
import SectionFeature from './components/SectionFeature';
import ModalDetail from './components/ModalDetail'
import generateCollumns from './columnModal';
import generateOrder from './columnOrder';
import styles from './index.less';
import 'aos/dist/aos.css';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
const { Option } = Select;
const Home = (props) => {
  const { dataOrders, isLoading, inforOrderModal } = props
  const { getAllDataOrdersDispath, getDetailOrderDispath, createOrderDispath, deleteOrderDispath, getInformationDispath } = props
  const [formModal] = Form.useForm();
  const [formProduct] = Form.useForm();

  const [orderDetails, setOrderDetails] = useState([]);
  const [hideColumn, setHideColumn] = useState(true);
  const [titleModal, setTitleModal] = useState('');
  const [valueSearch, setValueSearch] = useState('');
  const [paginatios, setPaginatios] = useState({
    filter: valueSearch, pageIndex: 1, pageSize: 10
  });
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [payTypeVisible, setPayTypeVisible] = useState(1);
  const [dataEditProduct, setDataEditProduct] = useState({})
  const onChange = (e) => {
    setHideColumn(e.target.value);
  };

  useEffect(() => {
    getAllDataOrdersDispath(paginatios)
  }, [getAllDataOrdersDispath, paginatios]);

  const createOder = () => {
    setVisible(true);
    setTitleModal("Tạo mới đơn");
    setOrderDetails([]);
    formModal.resetFields();
    formModal.setFieldsValue({ orderDate: moment(), isGenCode: false });
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onTableChange = async (pagination) => {
    const { current, pageSize } = pagination;
    const paging = { filter: valueSearch, pageIndex: current, pageSize };
    setPaginatios(paging);
  };

  const handleDeleteOrder = (index) => {
    setOrderDetails([...orderDetails.slice(0, index), ...orderDetails.slice(index + 1)]);
  }
  const onDeleteOrder = async (id) => {
    const response = await deleteOrderDispath(id);
    if (!isEmpty(response)) {
      getAllDataOrdersDispath(paginatios);
      openNotificationSuccess(`Xóa Thành công`);
      return
    }
    openNotificationError("Xóa không thành công");
  }
  const editProductOrderIndex = (dataEdit) => {
    formProduct.setFieldsValue({
      name: dataEdit.name,
      quantity: dataEdit.quantity,
      note: dataEdit.note,
      weight: dataEdit.weight,
      mass: dataEdit.mass,
      unit: dataEdit.unit
    });
    setDataEditProduct(dataEdit)
  }


  const checkAddProduct = (values) => {
    let newOtherProducts;
    let payload;
    const existOrderProduct = orderDetails.findIndex(it => it.id === dataEditProduct?.id);
    if (existOrderProduct > -1) {
      payload = { ...dataEditProduct, ...values }
      console.log(payload)
      newOtherProducts = ([...orderDetails.slice(0, existOrderProduct), payload, ...orderDetails.slice(existOrderProduct + 1)])
    } else {
      payload = { ...values, id: uuidv4(), }
      newOtherProducts = [...orderDetails, payload];
    }

    setOrderDetails(newOtherProducts);
    setDataEditProduct();
    formProduct.resetFields();
  }

  const onFinish = async (values) => {
    console.log(values)
    if (isEmpty(orderDetails)) {
      openNotificationError("Vui lòng thêm sản phẩm vận chuyển");
      return
    }
    const payload = { ...values, orderDate: moment(values.orderDate, FORMATS_DATE.DD_MM_YYYY).format(FORMATS_DATE.YYYY_MM_DD), deliveryOrderDetails: orderDetails }
    const response = await createOrderDispath(payload);
    if (!isEmpty(response)) {
      getAllDataOrdersDispath(paginatios)
      openNotificationSuccess(`${titleModal} Thành công`);
    }
    else {
      openNotificationError(`${titleModal} thất bại`);
    }
    handleCancel();
  };

  const editOrderPage = async (id) => {
    setVisible(true);
    setTitleModal("Sửa đơn")
    const response = await getDetailOrderDispath(id);
    if (response) {
      formModal.setFieldsValue({
        id: response.id,
        orderDate: moment(response.createdDate),
        shipper: response.shipper,
        consignee: response.consignee,
        fromAddress: response.fromAddress,
        toAddress: response.toAddress,
        shipperPhone: response.shipperPhone,
        consigneePhone: response.consigneePhone,
        sendType: response.sendType,
        receiveType: response.receiveType,
        paymentType: response.paymentType,
        totalAmount: response.totalAmount,
        additionalAmount: response.additionalAmount,
        province: response.province
      });
      setOrderDetails(response.deliveryOrderDetails)
    }
  }


  const onOpenModalDetail = async (id) => {
    await getInformationDispath(id)
    setVisibleModal(true)
  }

  const onCancelModalDetail = () => {
    setVisibleModal(false)
  }

  const pageOrderColumns = generateOrder({ onDelete: onDeleteOrder }, { isShow: hideColumn }, { editOrder: editOrderPage }, { openModalDetail: onOpenModalDetail });

  const modalOrderColumns = generateCollumns({ isShow: false }, { onDeleteOrder: handleDeleteOrder }, { editProductOrder: editProductOrderIndex })

  const onSearch = () => {
    const params = { filter: valueSearch, pageIndex: 1, pageSize: 10 };
    setPaginatios(params);
  }

  const onSearchInput = (value) => {
    console.log(`selected ${value}`);
  }

  return (
    <PageContainer
      loading={isLoading.page}
    >
      <SectionFeature />
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          <Input value={valueSearch} onChange={(e) => setValueSearch(e.target.value)} />
        </Col>
        <Col md={{ span: 6 }}>
          <Space size="middle">
            <Button
              type="primary"
              onClick={onSearch}
            >
              TÌm Kiếm
            </Button>
            <Button
              type="primary"
              onClick={createOder}
            >
              Tạo mới đơn
            </Button>
          </Space>
        </Col>
        <Col md={{ span: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <Radio.Group onChange={onChange} value={hideColumn} >
              <Radio value={true}>Rút gọn</Radio>
              <Radio value={false}>Toàn bộ cột</Radio>
            </Radio.Group>
          </div>
        </Col>
      </Row>
      <Row className={styles.wrapFeature} gutter={24}>
        <Col md={{ span: 24 }}>
          <DataTable2
            rowKey="id"
            columns={pageOrderColumns}
            dataSource={dataOrders?.items || []}
            loading={false}
            visibleIndex={true}
            pageIndex={paginatios.pageIndex}
            pagination={{
              current: paginatios.pageIndex,
              total: dataOrders?.total,
              pageSize: paginatios.pageSize,
            }}
            onChange={onTableChange}
          />
        </Col>

      </Row>
      <Drawer
        title={titleModal}
        width={720}
        onClose={handleCancel}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={handleCancel}>Đóng</Button>
            <Button htmlType="submit" form="formModal" type="primary">
              Gửi
            </Button>
          </Space>
        }
      >
        {isLoading.detail ? <Skeleton /> :
          <Fragment>
            <Form layout="vertical" name='formModal' form={formModal} autoComplete="false"
              onFinish={onFinish}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="isGenCode"
                    label="Tạo mã vận đơn"
                  >
                    <Radio.Group>
                      <Radio value={true}>Tạo</Radio>
                      <Radio value={false}>Không tạo</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="staffBusiness"
                    label="Nhân viên kinh doanh"
                  >
                    <Select placeholder="Chọn nhân viên kinh doanh">
                      {DELIVERY_TYPE.map((item) => <Option key={item.value} value={item.value}>{item.title}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="id"
                    label="Số mã"
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="orderDate"
                    label="Ngày tạo"
                    rules={[{ required: true, message: 'Vui lòng nhập ngày tạo' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                      format={FORMATS_DATE.DD_MM_YYYY}
                    // getPopupContainer={trigger => trigger.parentElement!}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="shipper"
                    label="Người gửi"
                    rules={[{ required: true, message: 'Vui lòng nhập người gửi' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="consignee"
                    label="Người nhận"
                    rules={[{ required: true, message: 'Vui lòng nhập người nhận' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="fromAddress"
                    label="Địa chỉ gửi"
                    rules={[{ required: true, message: 'Vui lòng nhập Địa chỉ gửi' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="toAddress"
                    label="Địa chỉ nhận"
                    rules={[{ required: true, message: 'Vui lòng nhập Địa chỉ nhận' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    showSearch
                    name="province"
                    label="Tỉnh"
                    rules={[{ required: true, message: 'Vui lòng chọn Tỉnh' }]}
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearchInput}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  >
                    <Select placeholder="Chọn tỉnh">
                      {PROVINCE.map((item) => <Option key={item.code} value={item.code}>{item.name}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="shipperPhone"
                    label="Số điện thoại người gửi"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại người gửi' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="consigneePhone"
                    label="Số điện thoại người nhận"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại người nhận' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="sendType"
                    label="Hình thức nhận hàng"
                    rules={[{ required: true, message: 'Vui lòng Chọn hình thức nhận hàng' }]}
                  >
                    <Select placeholder="Chọn hình thức nhận hàng">
                      {RECEIVE_TYPE.map((item) => <Option key={item.value} value={item.value}>{item.title}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="receiveType"
                    label="Hình thức giao hàng"
                    rules={[{ required: true, message: 'Vui lòng chọn hình thức giao hàng' }]}
                  >
                    <Select placeholder="Chọn hình thức giao hàng">
                      {DELIVERY_TYPE.map((item) => <Option key={item.value} value={item.value}>{item.title}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="paymentType"
                    label="Hình Thức thanh toán"
                    rules={[{ required: true, message: 'Vui lòng Chọn hình thức thanh toán' }]}
                  >
                    <Select placeholder="Chọn hình thức thanh toán" onChange={(value) => setPayTypeVisible(value)}>
                      {PAY_TYPE.map((item) => <Option key={item.value} value={item.value}>{item.title}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="totalAmount"
                    label="Cước vận chuyển"
                    rules={[{ required: true, message: 'Nhập cước vận chuyển' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value?.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {
                payTypeVisible === "Other" && <Row gutter={24}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      name="payType1"
                      label="Hình Thức thanh toán 1"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      name="payType2"
                      label="Hình Thức thanh toán 2"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              }
              <Row gutter={24}>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="additionalAmount"
                    label="Phát sinh khác"
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
            <Form layout="vertical" name='formProduct' form={formProduct} autoComplete="false"
              onFinish={checkAddProduct} >
              <Card title="Tao/Sua don hang" bordered={false}>
                <div style={{ padding: 20 }}>
                  <Row gutter={24}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="name"
                        label="Tên hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập tên hàng' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="quantity"
                        label="Số lượng"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="mass"
                        label="Khối lượng"
                        rules={[{ required: true, message: 'Vui lòng nhập khối lượng' }]}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="weight"
                        label="Trọng lượng"
                        rules={[{ required: true, message: 'Vui lòng nhập trọng lượng' }]}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="unit"
                        label="Đơn vị tính"
                        rules={[{ required: true, message: 'Vui lòng nhập Đơn vị tính' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="note"
                        label="Ghi chú"
                        rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Button htmlType="submit" form="formProduct" type="primary">
                        Thêm
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
              {
                (!isEmpty(orderDetails)) &&
                <div style={{ paddingTop: 16 }}>
                  <DataTable2
                    rowKey="id"
                    loading={false}
                    columns={modalOrderColumns}
                    pagination={{
                      show: false,
                      pageSize: orderDetails.length
                    }}
                    dataSource={orderDetails}
                  />
                </div>
              }
            </Form>
          </Fragment>
        }
      </Drawer>
      <ModalDetail visible={visibleModal} onCancel={onCancelModalDetail} inforOrderModal={inforOrderModal} />
    </PageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  dataOrders: selectorDataOrders,
  isLoading: selectIsLoading,
  inforOrderModal: selectInfOrder
});

const mapDispatchToProps = (dispatch) => ({
  getAllDataOrdersDispath: (payload) => dispatch(getAllOrdersAction(payload)),
  getDetailOrderDispath: (payload) => getDetailOrderAction(dispatch)(payload),
  createOrderDispath: (payload) => asyncCreateOrderAction(dispatch)(payload),
  deleteOrderDispath: (payload) => asyncDeleteOrderAction(dispatch)(payload),
  getInformationDispath: (payload) => dispatch(getInfOrderAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
