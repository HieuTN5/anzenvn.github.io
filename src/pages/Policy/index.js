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
const Policy = (props) => {
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

  const [valueTab, setValueTab] = useState("1");
  const onChangeValueTab = (key) => {
    if (key === "1") {
      getAllBillsDispatch({ ...paginatios, pageIndex: 1 });
    }
    setValueTab(key);
    formBill.setFieldsValue({ ladingDate: moment() });
  }

  return (
    <PageContainer
      loading={isLoading.page}
    >
      <Tabs activeKey={valueTab} onChange={onChangeValueTab}>
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              Danh sách bảng kê đã tạo
            </span>
          }
          key="1"
        >
          <Row gutter={24}>
            <Col md={{ span: 12 }}>
              <Button
                type="primary"
                onClick={() => onChangeValueTab("2")}
              >
                Tạo mới bảng kê
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
            title={`BẢNG KÊ GIAO NHẬN VẬN CHUYỂN ---- ${dataInformation?.code} `}
            width={1000}
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
                <Col xs={24} md={8}>
                  <strong> Tên công ty: </strong> <span>{dataInformation?.partner}</span>
                </Col>
                <Col xs={24} md={8}>
                  <strong> Số điệnn thoại: </strong>  <span>{dataInformation?.partnerPhone}</span>
                </Col>
                <Col xs={24} md={8}>
                  <strong> Mã số thuế: </strong>  <span>{dataInformation?.partnerTax}</span>
                </Col>
              </Row>
              <br />
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <strong>Số hợp đồng: </strong> <span>{dataInformation?.referenceContract}</span>
                </Col>
                <Col xs={24} md={8}>
                  <strong> Người lái xe: </strong> <span>{dataInformation?.driver}</span>
                </Col>
                <Col xs={24} md={8}>
                  <strong> Biển số xe: </strong>  <span>{dataInformation?.licensePlate}</span>
                </Col>
              </Row>
              <br />
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <strong> CMND: </strong>  <span>{dataInformation?.driverIdentity}</span>
                </Col>
                <Col md={{ span: 16 }}>
                  <strong> Địa chỉ: </strong> <span>{dataInformation?.driverAddress}</span>
                </Col>
              </Row>
              <br />
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <strong> GPLX: </strong> <span>{dataInformation?.drivingLicense}</span>
                </Col>
                <Col xs={24} md={8}>
                  <strong> Điện thoại lái xe: </strong>  <span>{dataInformation?.driverPhone}</span>
                </Col>
                <Col xs={24} md={8}>
                  <strong> Tổng cước cho xe: </strong>  <span>{formatNumber(dataInformation?.totalCOD)}</span>
                </Col>
              </Row>
              <br />
            </Form>
            <DataTable2
              rowKey="numberCode"
              columns={columns}
              dataSource={dataInformation?.deliveryOrderBillOfLadings || []}
              loading={false}
              visibleIndex
              summary={pageData => {
                const totalAmount = pageData.reduce((prev, cur) => prev + cur.cod, 0)
                return !isEmpty(dataInformation?.deliveryOrderBillOfLadings) && (
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
                        <Text>{formatNumber(dataInformation?.advanceAmount)}</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </Modal>
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              {titlePage}
            </span>
          }
          key="2"
        >
          <CreateBill
            dataDelivery={dataDelivery}
            formBill={formBill}
            onTableChange={onTableChange}
            paginatios={paginatios}
            formModal={formModal}
            columns={columns}
            setDataDelivery={setDataDelivery}
            setTitlePage={setTitlePage}
            titlePage={titlePage}
            advanceAmount={advanceAmount}
            setAdvanceAmount={setAdvanceAmount}
          />
        </TabPane>
      </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(Policy);
